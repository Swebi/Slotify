"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TimeSlot, FreeHour } from "@/lib/schema";
import { createResponse, getFormData } from "@/actions/actions";
import { timeSlots } from "@/data/data";
import { useToast } from "@/hooks/use-toast";

const FormId = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const formId = params.id as string;
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [formInfo, setFormInfo] = useState<any>();

  const [freeHours, setFreeHours] = useState<FreeHour>({
    DO1: [],
    DO2: [],
    DO3: [],
    DO4: [],
    DO5: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createResponse({ freeHours, name, regNo, formId });
    console.log(response);
    if (response?.success) {
      toast({
        title: "Response submitted successfully",
        description: "Your response has been recorded.",
        className: "dark text-white border-white/10",
      });
      // setName("");
      // setRegNo("");
      // setFreeHours({
      //   DO1: [],
      //   DO2: [],
      //   DO3: [],
      //   DO4: [],
      //   DO5: [],
      // });
    } else {
      toast({
        title: "Failed to submit response",
        description: response?.error || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const findForm = async () => {
    const data = await getFormData({ formId });
    if (data.success) {
      setFormInfo(data.data);
    } else {
      toast({
        title: "Failed to load form",
        description: "The requested form could not be found.",
        variant: "destructive",
      });
      router.push("/");
    }
  };

  useEffect(() => {
    findForm();
  }, []);

  return (
    <form
      className="flex flex-col w-full h-full gap-8 justify-center items-center max-w-2xl mx-auto p-8 mt-6 border bg-white rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <h1 className="text-5xl text-blue-500 self-start font-bold">
        Title:{" "}
        <p className="text-4xl text-blue-400 font-medium">{formInfo?.title}</p>
      </h1>
      <h1 className="text-2xl self-start font-semibold">
        Description: <p className="font-normal">{formInfo?.description}</p>
      </h1>

      <div className="w-full">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="w-full">
        <Label htmlFor="regNo">Registration Number</Label>
        <Input
          id="regNo"
          name="regNo"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
        />
      </div>
      {Object.keys(freeHours).map((dayOrder) => (
        <div key={dayOrder} className="w-full">
          <p className="text-lg font-bold mb-2">{dayOrder}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {timeSlots.map((timeSlot: TimeSlot) => (
              <div
                className="flex items-center gap-x-2"
                key={`${dayOrder}-${timeSlot.value}`}
              >
                <Input
                  type="checkbox"
                  className="h-5 w-5"
                  value={timeSlot.value}
                  name={`${dayOrder}` + `${timeSlot.value}`}
                  onChange={(e) => {
                    const updatedHours = freeHours;

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
                <Label htmlFor={`${dayOrder}-${timeSlot.value}`}>
                  {timeSlot.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button type="submit" className="w-full py-6 bg-blue-500">
        Submit
      </Button>
    </form>
  );
};
export default FormId;
