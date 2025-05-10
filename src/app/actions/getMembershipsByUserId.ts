"use server";

import prisma from "@/lib/prisma";

export const getMembershipsByUserId = async (userId: string) => {
  const memberships = await prisma.memberInfo.findMany({
    where: {
      userId: userId,
    },
  });

  return memberships;
};
