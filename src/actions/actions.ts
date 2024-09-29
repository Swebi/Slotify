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
    if (formCheck) {
      Object.keys(freeHours).map((dayOrder) => {
        freeHours[dayOrder].map(
          async (freeHour) =>
            await prisma.response.create({
              data: {
                name,
                regNo,
                formId,
                dayOrder,
                freeHour,
              },
            })
        );
      });
    } else {
      throw new Error("Invalid Form ID");
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create response" };
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
    await prisma.form.create({
      data: {
        title,
        description,
      },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to create snippet" };
  }
}

export async function getSchedule({
  adminId,
  dayOrder,
}: {
  adminId: string;
  dayOrder: string;
}) {
  try {
    const formCheck = await prisma.form.findUnique({
      where: {
        adminId: adminId,
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
        timeHours.map(async (freeHour: string) => {
          const responses = await prisma.response.findMany({
            where: {
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
