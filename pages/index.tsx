import { HeroBanner, Product, FooterBanner } from "components";
import React from "react";
import { client } from "lib/client";
import { GetServerSideProps } from "next";
import { BannerData, ProductType } from "models";

const index = ({
  products,
  bannerData,
}: {
  products: Array<ProductType>;
  bannerData: Array<BannerData>;
}) => {
  return (
    <>
      <div>
        <HeroBanner heroBanner={bannerData[0]} />
        <div className="products-heading">
          <h2>Best Selling Products</h2>
          <p>Speakers of many variations</p>
        </div>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id.toString()} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData[0]} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  console.log({ products, bannerData });
  return {
    props: { products, bannerData },
  };
};
export default index;
