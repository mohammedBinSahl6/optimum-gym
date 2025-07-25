"use server";

import { $Enums } from "@prisma/client";

export type MembersBoard = {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  phoneNumber: string | null;
  email: string | null;
  username: string | null;
  MemberInfo:
    | {
        id: string;
        info: string | null;
        userId: string;
        height: number;
        weight: number;
        plan: string;
        startDate: Date;
        endDate: Date;
        status: $Enums.SubscriptionStatus;
        subscriptionCost: number;
      }[]
    | null;
}[];

export async function getFilterdMembers(
  filter: string
): Promise<MembersBoard | "error"> {
  try {
    const members = await prisma.user.findMany({
      where: {
        role: "MEMBER",
        accepted: true,
        MemberInfo: {
          every: {
            status:
              filter === "Active"
                ? "ACTIVE"
                : filter === "Inactive"
                ? "UNACTIVE"
                : filter === "Expired"
                ? "EXPIRED"
                : undefined,
          },
        },
      },
      select: {
        MemberInfo: true,
        id: true,
        image: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        email: true,
        username: true,
      },
    });

    return members;
  } catch (error) {
    console.log(error);
    return "error";
  }
}
