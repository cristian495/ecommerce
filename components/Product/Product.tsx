import { urlFor } from "lib/client";
import { ProductType } from "models";
import Link from "next/link";
import React from "react";

const Product = ({ product }: { product: ProductType }) => {
  const { image, name, slug, price } = product;
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            className="product-image"
            src={`${urlFor(image[0])}`}
            width={250}
            height={250}
            alt={`${name}`}
          />
          <p className="product-name">{name}</p>
          <p className="product-name">{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
