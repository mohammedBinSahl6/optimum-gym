"use server";

import formSchema from "@/lib/zod/membership";
import { User } from "@prisma/client";
import { z } from "zod";

export async function handleNewUser(
  user: User,
  action: "accept" | "reject",
  membershipValues?: z.infer<typeof formSchema>
): Promise<"success" | "error"> {
  try {
    if (action === "accept") {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          accepted: true,
        },
      });
      if (user.role === "MEMBER") {
        await prisma.memberInfo.create({
          data: {
            plan: membershipValues?.plan,
            height: Number(membershipValues?.height),
            weight: Number(membershipValues?.weight),
            startDate: membershipValues?.startDate,
            endDate: membershipValues?.endDate,
            userId: user.id,
            status: "ACTIVE",
            subscriptionCost: Number(membershipValues?.subscriptionCost),
          },
        });
      }
    } else {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
    }
    return "success";
  } catch (error) {
    console.log(error);
    return "error";
  }
}
