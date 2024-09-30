import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SiDatabricks } from "react-icons/si";

const Navbar = async () => {
  return (
    <div className="flex w-[85%] mx-auto  rounded-full justify-between py-4 px-8 mt-6  bg-[#202020]  ">
      <Link href="/">
        <div className="flex justify-center items-center gap-2">
          <SiDatabricks className="text-3xl text-white" />
          <h1 className="text-3xl font-medium text-white">Slotify</h1>
        </div>
      </Link>

      <div className="flex justify-center items-center gap-3">
        {/* <Link href="/">
          <Button className="bg-black"> Home </Button>
        </Link> */}
        <Link href="/create">
          <Button className="bg-black"> Create </Button>
        </Link>
        <Link href="/generate">
          <Button className="bg-black"> Generate </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
