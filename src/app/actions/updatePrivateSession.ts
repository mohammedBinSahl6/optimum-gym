"use server";

import { z } from "zod";

import formSchema from "@/lib/zod/privateSession";

export async function updatePrivateSession(
  sessionId: string,
  values?: z.infer<typeof formSchema>
): Promise<"success" | "error"> {
  try {
    await prisma.privateSession.update({
      where: {
        id: sessionId,
      },
      data: {
        sessionsNumber: Number(values.sessions),
        startSessionDate: values.startDate,
      },
    });
    return "success";
  } catch (error) {
    console.log(error);
    return "error";
  }
}
