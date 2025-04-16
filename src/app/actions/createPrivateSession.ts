"use server";

import formSchema from "@/lib/zod/privateSession";
import { z } from "zod";

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
