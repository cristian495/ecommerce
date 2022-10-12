import Link from "next/link";
import React from "react";
import { BannerData } from "models";
import { urlFor } from "lib/client";

const HeroBanner = ({ heroBanner }: { heroBanner?: BannerData }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner!.smallText}</p>
        <h3>{heroBanner!.midText}</h3>
        <h3>{heroBanner!.largeText1}</h3>
        <img
          src={urlFor(heroBanner!.image)}
          alt="banner"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${heroBanner?._id}`}>
            <button type="button">{heroBanner!.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner!.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
