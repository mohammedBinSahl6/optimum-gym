"use server";

import { SessionFormType } from "@/components/session/SessionForm";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { Session } from "@prisma/client";
import ImageKit from "imagekit";

export async function createSession(
  session: SessionFormType
): Promise<{ success: boolean; session?: Session; message: string }> {
  const currentUser = await getCurrentUser();

  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
  });
  try {
    const imageResult = await new Promise<{
      url: string;
    }>((resolve, reject) => {
      imagekit.upload(
        {
          file: session.image,
          overwriteFile: true,
          useUniqueFileName: false,
          folder: "o-gym/sessions",
          fileName: `${new Date().getTime()}-${session.title}.png`,
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      );
    });

    const newSession = await prisma.session.create({
      data: {
        content: session.content,
        image: imageResult.url,
        published: session.published,
        title: session.title,
        authorId: currentUser.id,
      },
    });
    return {
      success: true,
      session: newSession,
      message: "Session created successfully",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create session" };
  }
}
