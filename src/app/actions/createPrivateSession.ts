"use server";

import { z } from "zod";

import formSchema from "@/lib/zod/privateSession";

export async function createPrivateSession(
  coachId: string,
  values?: z.infer<typeof formSchema>
): Promise<"success" | "error"> {
  try {
    await prisma.privateSession.create({
      data: {
        coachId,
        memberId: values?.member,
        startSessionDate: values?.startDate,
        sessionsNumber: Number(values?.sessions),
      },
    });
    return "success";
  } catch (error) {
    console.log(error);
    return "error";
  }
}
