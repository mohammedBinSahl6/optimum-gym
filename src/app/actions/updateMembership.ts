"use server";

import prisma from "@/lib/prisma";
import formSchema from "@/lib/zod/membership";
import { z } from "zod";

export const updateMembership = async (
  membershipId: string,
  values: z.infer<typeof formSchema>
) => {
  try {
    const updatedMembership = await prisma.memberInfo.update({
      where: {
        id: membershipId,
      },
      data: {
        plan: values.plan,
        startDate: values.startDate,
        endDate: values.endDate,
        subscriptionCost: Number(values.subscriptionCost),
        height: Number(values.height),
        weight: Number(values.weight),
      },
    });
    return {success: true, membership: updatedMembership};
  } catch (error) {
    console.log(error);
    return {success: false, error: error};
  }
};
