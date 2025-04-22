"use server";

export type Subscriber = {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  privateSessionsAsMember:
    | {
        id: string;
        coachId: string;
        memberId: string;
        startSessionDate: Date;
        sessionsNumber: number;
      }[]
    | null;
}[];

export async function getPrivateSubscribers(
  coachId: string
): Promise<Subscriber | "error"> {
  try {
    const members = await prisma.user.findMany({
      where: {
        role: "MEMBER",
        accepted: true,
        privateSessionsAsMember: {
          some: {
            coachId,
          },
          
        },
      },
      select: {
        privateSessionsAsMember: true,
        id: true,
        image: true,
        firstName: true,
        lastName: true,
      },
    });

    return members;
  } catch (error) {
    console.log(error);
    return "error";
  }
}
