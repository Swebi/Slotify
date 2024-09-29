"use client";
import { createForm } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createForm({ title, description });
  };

  return (
    <form
      className="flex flex-col w-full h-full gap-8 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl">Create a new form</h1>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Set Description</Label>
        <Input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
};

export default CreateForm;
