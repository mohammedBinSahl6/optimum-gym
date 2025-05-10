"use server";

import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export interface PrivateSessionResponse {
  coach: User;
  startSessionDate: Date;
  sessionsNumber: number;
}

export const getPrivateSessionsByUserId = async (
  userId: string
): Promise<PrivateSessionResponse[]> => {
  const memberships = await prisma.privateSession.findMany({
    where: {
      memberId: userId,
    },
    select: {
      coach: true,
      startSessionDate: true,
      sessionsNumber: true,
    },
  });

  return memberships;
};
