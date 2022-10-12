import { Product, QuantityInput } from "components";
import { useCartState } from "hooks";
import { client, urlFor } from "lib/client";
import { ProductType, Slug } from "models";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { toast } from "react-hot-toast";

const ProductDetails = ({
  product,
  products,
}: {
  product: ProductType;
  products: Array<ProductType>;
}) => {
  const { image, name, price, details } = product;
  const [index, setIndex] = useState(0);
  const [localQty, setLocalQty] = useState(1);
  const { addItem, toggleCart } = useCartState();
  
  if (!product) {
    return (
      <div className="product-detail-container" style={{ height: "60vh" }}>
        <h3>Producto no econtrado :(</h3>
      </div>
    );
  }



  const decrementLocalQty = () => {
    const newVal = localQty > 1 ? localQty - 1 : 1;
    setLocalQty(newVal);
  };
  const incrementLocalQty = () => {
    const newVal = localQty + 1;
    setLocalQty(newVal);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img
            src={urlFor(image[index] ? image[index] : image[0])}
            alt=""
            className="product-detail-image"
          />
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                className={`small-image ${
                  i === index ? "image selected-image" : ""
                } `}
                onMouseEnter={() => {
                  setIndex(i);
                }}
                key={i}
                src={urlFor(item)}
              ></img>
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <QuantityInput
              localQty={localQty}
              decrementLocalQty={decrementLocalQty}
              incrementLocalQty={incrementLocalQty}
            />
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                addItem({ product, quantity: localQty });
                toast.success(`${localQty} ${product.name} added to the cart.`);
              }}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="buy-now"
              onClick={() => {
                addItem({ product, quantity: localQty });
                toggleCart();
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item, i) => (
              <Product key={item._id.toString()} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
      slug {
          current
      }
    }`;
  const products = await client.fetch(query);
  const paths = products.map((product: { slug: Slug }) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

type Params = {
  params: {
    slug: string;
  };
};
export const getStaticProps = async ({ params }: Params) => {
  const { slug } = params;

  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
