import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { BannerData } from "models";
import Head from "next/head";
import React from "react";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
  footerBanner?: BannerData;
}) => {
  return (
    <div className="layout">
      <Head>
        <title>Ecommerce store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
