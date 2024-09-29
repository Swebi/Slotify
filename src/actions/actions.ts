"use server";

import { timeHours } from "@/data/data";
import prisma from "@/lib/db";
import { FreeHour } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function createResponse({
  freeHours,
  name,
  regNo,
  formId,
}: {
  freeHours: FreeHour;
  name: string;
  regNo: string;
  formId: string;
}) {
  try {
    const formCheck = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    if (!formCheck) {
      return { success: false, error: "Invalid form ID" };
    }

    const responses = [];
    for (const [dayOrder, hours] of Object.entries(freeHours)) {
      for (const freeHour of hours) {
        const response = await prisma.response.create({
          data: {
            name,
            regNo,
            formId,
            dayOrder,
            freeHour,
          },
        });
        responses.push(response);
      }
    }

    return { success: true, responses };
  } catch (error) {
    console.error("Error creating response:", error);
    return { success: false, error: "Failed to submit response" };
  }
}

export async function createForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  try {
    const result = await prisma.form.create({
      data: {
        title,
        description,
      },
    });
    return {
      success: true,
      data: result.id,
      message: "Successfully Created Form",
    };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create form" };
  }
}

export const getFormData = async ({ formId }: { formId: string }) => {
  const response = await prisma.form.findUnique({
    where: {
      id: formId,
    },
  });
  if (response) {
    return { success: true, data: response };
  } else {
    return { success: false, error: "Failed to get form data " };
  }
};

export async function getSchedule({
  id,
  dayOrder,
}: {
  id?: string;
  dayOrder: string;
}) {
  try {
    const formCheck = await prisma.form.findUnique({
      where: {
        id: id,
      },
    });

    if (formCheck) {
      let data: FreeHour = {
        "0800": [],
        "0850": [],
        "0945": [],
        "1040": [],
        "1135": [],
        "1230": [],
        "1325": [],
        "1420": [],
        "1510": [],
        "1600": [],
      };

      // Use Promise.all to resolve all asynchronous operations inside the map
      await Promise.all(
        Object.keys(timeHours).map(async (freeHour: string) => {
          const responses = await prisma.response.findMany({
            where: {
              formId: id,
              dayOrder,
              freeHour,
            },
            select: {
              freeHour: true,
              name: true,
            },
          });
          responses.forEach((response) => {
            data[freeHour].push(response.name);
          });
        })
      );

      return { success: true, data };
    } else {
      throw new Error("Invalid Form ID");
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to generate schedule" };
  }
}
