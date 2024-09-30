import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SiDatabricks } from "react-icons/si";
import logo from "@/assets/logo-white-1200x1200.png";
import Image from "next/image";

const Navbar = async () => {
  return (
    <div className="flex w-[85%] mx-auto  rounded-full justify-between py-4 px-4 md:px-8 mt-6  bg-[#202020]  ">
      <Link href="/">
        <div className="flex justify-center items-center gap-2">
          {/* <SiDatabricks className="text-3xl text-white" /> */}
          <Image src={logo} height={0} width={0} className="h-10 w-10" alt="" />
          <h1 className="text-3xl font-medium text-white">Slotify</h1>
        </div>
      </Link>

      <div className="flex justify-center items-center gap-1 md:gap-4">
        {/* <Link href="/">
          <Button className="bg-black"> Home </Button>
        </Link> */}
        <Link href="/dashboard">
          <p className=" text-white text-sm md:text-base"> Dashboard </p>
        </Link>
        <Link href="/create">
          <p className=" text-white text-sm md:text-base"> Create </p>
        </Link>
        <Link href="/generate">
          <p className=" text-white text-sm md:text-base"> Generate </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
