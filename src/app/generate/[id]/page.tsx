"use client";
import { createForm, getSchedule } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { timeHours } from "@/data/data";
import { FreeHour } from "@/lib/schema";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const GenerateSchedule = () => {
  const params = useParams();
  const idParam = params.id || "";
  const paramId = Array.isArray(idParam) ? idParam[0] : idParam;

  const [id, setId] = useState<string>(paramId);
  const [dayOrder, setDayOrder] = useState("DO1");

  const [response, setResponse] = useState<FreeHour>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await getSchedule({ id, dayOrder });

    setResponse(response.data);
  };

  useEffect(() => {
    console.log(response);
  }, [response]);
  return (
    <div className="flex flex-col w-full h-full gap-8 justify-start items-center">
      <form
        className="flex flex-col w-full max-w-md gap-6 mb-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center">Generate Schedule</h1>
        <div className="w-full flex flex-col gap-4 justify-start items-start">
          <Label htmlFor="title">Form ID</Label>
          <Input
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className=""
          />
        </div>
        <div className="w-full flex flex-col gap-4 justify-start items-start">
          <Label htmlFor="dayOrder">Day Order</Label>
          <Select
            name="dayOrder"
            value={dayOrder}
            onValueChange={(value) => {
              setDayOrder(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Day Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DO1">DO1</SelectItem>
              <SelectItem value="DO2">DO2</SelectItem>
              <SelectItem value="DO3">DO3</SelectItem>
              <SelectItem value="DO4">DO4</SelectItem>
              <SelectItem value="DO5">DO5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="flex w-full justify-center items-center"
        >
          Create
        </Button>
      </form>

      <Table>
        <TableCaption>Helpdesk Schedule for {dayOrder}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Time Slot</TableHead>
            <TableHead className="w-fit">Duties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response
            ? Object.keys(response)
                .sort()
                .map((row) => (
                  <TableRow key={row}>
                    <TableCell>{timeHours[row]}</TableCell>
                    {response[row].map((name) => (
                      <TableCell className="w-fit" key={`${row} + ${name}`}>
                        {name}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            : ""}
        </TableBody>
      </Table>
    </div>
  );
};

export default GenerateSchedule;
