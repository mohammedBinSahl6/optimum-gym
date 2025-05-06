"use server";

import prisma from "@/lib/prisma";

export const cancelMemberShip = async (memberId: string) => {
  try {
    await prisma.memberInfo.update({
      where: {
        id: memberId,
      },
      data: {
        status: "CANCELLED",
      },
    });
    return "success";
  } catch (error) {
    console.log(error);
    return error;
  }
};
