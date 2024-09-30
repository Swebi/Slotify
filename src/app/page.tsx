"use client";
import logo from "@/assets/logo-base-1200x1200.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sampleResponse, timeHours } from "@/data/data";

const Home = () => {
  return (
    <div className="flex md:flex-row flex-col w-full h-full gap-0 justify-center items-center">
      <div className="flex flex-col w-[45%] h-screen  p-20 gap-4">
        <Image src={logo} height={0} width={0} className="h-20 w-20" alt="" />

        <h1 className="text-4xl font-bold text-blue-500">
          Automate your club's helpdesk scheduling
        </h1>
        <p className="text-xl font-light">
          With slotify, say goodbye to google forms and manual sheets for
          timetables . A single platform to create forms, collect data, generate
          schedules and share. <br />
          Completely free and open source
        </p>
        <Button className="bg-black text-xs md:text-sm w-fit py-5 px-7">
          Get Started
        </Button>
      </div>
      <div className="flex flex-col pt-20 w-[55%] h-screen ">
        <Table className="min-h-[500px]">
          <TableCaption>Helpdesk Schedule for Day Order 1</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Time Slot</TableHead>
              <TableHead className="w-fit">Duties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleResponse
              ? Object.keys(sampleResponse)
                  .sort()
                  .map((row) => (
                    <TableRow key={row}>
                      <TableCell>{timeHours[row]}</TableCell>
                      {sampleResponse[row].map(
                        (name: string, index: string) => (
                          <TableCell
                            className="w-fit"
                            key={`${index} + ${name}`}
                          >
                            {name}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  ))
              : ""}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
