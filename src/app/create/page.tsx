"use client";

import { createForm } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { IoCopy } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";

const CreateForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formId, setFormId] = useState<string | undefined>("");

  const deployedUrl =
    process.env.NEXT_PUBLIC_DEPLOYED_URL || "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await createForm({ title, description });

    if (response.success) {
      setFormId(response.data);

      toast({
        title: "The form has been created successfully",
        description: `ID: ${response.data}`,
        className: "dark text-white border-white/10",
        action: (
          <ToastAction
            altText="Generate"
            onClick={() => {
              router.push(`/generate/${response.data}`);
            }}
          >
            Go
          </ToastAction>
        ),
      });
    } else {
      toast({
        title: "Failed to create form",
        description: "There was an error creating the form",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    if (formId) {
      try {
        await navigator.clipboard.writeText(`${deployedUrl}/form/${formId}`);
        toast({
          title: "Copied to clipboard",
          description: "The form ID has been copied to your clipboard.",
          className: "dark text-white border-white/10",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to copy",
          description:
            "There was an error copying the form ID to your clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 justify-center items-center">
      <form
        className="flex flex-col w-full max-w-md gap-8 bg-white border p-16 mt-20 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center ">Create a new form</h1>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description" className="">
            {" "}
            Description
          </Label>
          <Input
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-500/90 py-6">
          Create
        </Button>
      </form>
      {formId && (
        <div className="flex items-center gap-2">
          <Input value={formId} className="w-64" />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="flex gap-1 justify-center items-center gray-50"
          >
            <IoCopy className="h-4 w-4" />
            <p className="text-xs">Copy </p>
          </Button>
          <Button
            onClick={() => {
              router.push(`/form/${formId}`);
            }}
            variant="outline"
            className="flex gap-1 justify-center items-center bg-gray-50"
          >
            <IoIosLink className="h-4 w-4" />
            <p className="text-xs">Go</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
