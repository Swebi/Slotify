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
import { FreeHour } from "@/lib/schema";

import React, { useEffect, useState } from "react";

const GenerateSchedule = () => {
  const [adminId, setAdminId] = useState("");
  const [dayOrder, setDayOrder] = useState("0");

  const [response, setResponse] = useState<FreeHour>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await getSchedule({ adminId, dayOrder });

    setResponse(response.data);
  };

  useEffect(() => {
    console.log(response);
  }, [response]);
  return (
    <div className="flex flex-col w-full h-full gap-8 justify-center items-center">
      <form
        className="flex flex-col w-full h-full gap-8 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl">Get a schedule</h1>
        <div>
          <Label htmlFor="title">Admin ID</Label>
          <Input
            name="adminID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="dayOrder">Day Order</Label>
          <Select
            name="dayOrder"
            value={dayOrder}
            onValueChange={(value) => {
              setDayOrder(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
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
        <Button type="submit">Create</Button>
      </form>
      <Table>
        {/* <TableCaption></TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Time Slot</TableHead>
            <TableHead>Duty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response
            ? Object.keys(response)
                .sort()
                .map((row) => (
                  <TableRow key={row}>
                    <TableCell>{row}</TableCell>
                    {response[row].map((name) => (
                      <TableCell key={`${row} + ${name}`}>{name}</TableCell>
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
