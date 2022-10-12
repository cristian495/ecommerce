import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";
import { CartItem } from "models";
import { urlFor } from "lib/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
        const products: Array<CartItem> = JSON.parse(req.body).cartItems;
        console.log(products);

      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        mode: "payment",
        shipping_options: [{ shipping_rate: "shr_1LkeP8L3RuxG2FSsUhKaPZl3" }],
        line_items: products.map((p) => ({
          price_data: {
            currency: "pen",
            product_data: {
              name: p.product.name,
              images: p.product.image.map((i) => urlFor(i).toString()),
            },
            unit_amount:Math.round(p.product.price * 100) ,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: p.quantity,
        })),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (error: any) {
      res.status(200).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
