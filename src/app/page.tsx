"use client";

import Image from "next/image";
import logo from "@/assets/logo-base-1200x1200.png";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <div className="flex flex-col w-full lg:w-[45%] p-6 lg:p-20 gap-4 justify-start">
        <Image
          src={logo}
          height={80}
          width={80}
          className="h-20 w-20"
          alt="Slotify Logo"
        />

        <h1 className="text-3xl lg:text-4xl font-bold text-blue-500">
          Automate your club's helpdesk scheduling
        </h1>
        <p className="text-lg lg:text-xl font-light leading-tight">
          With slotify, say goodbye to google forms and manual sheets for
          timetables. A single platform to create forms, collect data, generate
          schedules and share. <br className="hidden sm:inline" />
          Completely free and open source
        </p>
        <Button className="bg-black text-xs md:text-sm w-fit py-5 px-7 mt-4">
          Get Started
        </Button>
      </div>
      <div className="flex flex-col w-full lg:w-[55%] p-6 lg:pt-20 overflow-x-auto">
        <Table className="min-w-[500px]">
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
                      <TableCell className="whitespace-nowrap">
                        {timeHours[row]}
                      </TableCell>
                      {sampleResponse[row].map(
                        (name: string, index: number) => (
                          <TableCell className="w-fit" key={`${index}-${name}`}>
                            {name}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
