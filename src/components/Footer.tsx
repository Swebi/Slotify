import Link from "next/link";
import React from "react";
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
  return (
    <div className="flex w-full gap-2 justify-center items-center p-5 h-20 bg-[#0C0C0D]">
      <Link href="https://github.com/Swebi">
        <h1 className="text-white text-base">Crafted by Sweb</h1>
      </Link>
      <Link href="https://github.com/Swebi/Slotify">
        <IoLogoGithub className="text-white text-2xl" />
      </Link>
    </div>
  );
};

export default Footer;
