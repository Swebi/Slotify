"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TimeSlot, FreeHour } from "@/lib/schema";
import { createResponse } from "@/actions/actions";
import { timeSlots } from "@/data/data";

const FormId = () => {
  const params = useParams();
  const formId = params.formId as string;

  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");

  const [freeHours, setFreeHours] = useState<FreeHour>({
    DO1: [],
    DO2: [],
    DO3: [],
    DO4: [],
    DO5: [],
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createResponse({ freeHours, name, regNo, formId });
  };

  return (
    <form
      className="flex flex-col w-full h-full gap-8 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl">FORM ID: {formId}</h1>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="regNo">Registration Number</Label>
        <Input
          name="regNo"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
        />
      </div>
      {Object.keys(freeHours).map((dayOrder) => (
        <div key={dayOrder} className="flex flex-col gap-2 mt-2">
          <p className="text-lg font-bold ">{dayOrder}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 justify-center items-center">
            {timeSlots.map((timeSlot: TimeSlot) => (
              <div
                className="flex gap-1 justify-start items-center"
                key={`${dayOrder}` + `${timeSlot.value}`}
              >
                <Input
                  type="checkbox"
                  className="h-5 w-5"
                  value={timeSlot.value}
                  name={`${dayOrder}` + `${timeSlot.value}`}
                  onChange={(e) => {
                    let updatedHours = freeHours;

                    if (updatedHours[dayOrder].includes(e.target.value)) {
                      updatedHours[dayOrder] = updatedHours[dayOrder].filter(
                        (value) => value !== e.target.value
                      );
                    } else {
                      updatedHours[dayOrder].push(e.target.value);
                    }
                    setFreeHours(updatedHours);
                  }}
                />
                <Label htmlFor={`${dayOrder}` + `${timeSlot.value}`}>
                  {timeSlot.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormId;
