"use server";

import { z } from "zod";
import { hash } from "bcrypt";

import formSchema from "@/lib/zod/register";
import { getTranslations } from "next-intl/server";

export default async function createUser(
  user: z.infer<typeof formSchema>
): Promise<{
  message: string;
  status: number;
}> {
  try {
    const t = await getTranslations("RegisterPage");
    const ExistsUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (ExistsUser) {
      return {
        message: t("ExistUserMessage"),
        status: 400,
      };
    }

    const hashedPassword = await hash(user.password, 10);

    const role =
      user.role === "admin"
        ? "ADMIN"
        : user.role === "coach"
        ? "COACH"
        : "MEMBER";

    await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        role,
      },
    });

    return {
      message: t("SuccessMessage"),
      status: 200,
    };
  } catch (error) {
    return {
      message: `Inernal Server Error: ${error}`,
      status: 500,
    };
  }
}
