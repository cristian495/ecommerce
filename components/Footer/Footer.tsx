
import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  const date = new Date();
  return <div className="footer-container">
    <p>{`${date.getFullYear()} MGComputerGroup - All rights reserved`}</p>
    <p className="icons">
      <AiFillInstagram/>
      <AiOutlineTwitter/>
    </p>
  </div>
};

export default Footer;
