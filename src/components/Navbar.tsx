import React from "react";
import { FaDatabase } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { SiDatabricks } from "react-icons/si";

const Navbar = async () => {
  return (
    <div className="flex w-[85%] mx-auto  rounded-full justify-between py-4 px-8 mt-6  bg-[#0C0C0D]  ">
      <Link href="/">
        <div className="flex justify-center items-center gap-2">
          <SiDatabricks className="text-3xl text-white" />
          <h1 className="text-3xl text-white">Slotify</h1>
        </div>
      </Link>

      <div className="flex justify-center items-center gap-3">
        <Link href="/create">
          <Button className="dark"> Create </Button>
        </Link>
        <Link href="/generate">
          <Button className="dark"> Generate </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
