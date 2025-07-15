import prisma from "@/lib/prisma";

export async function checkAndUpdateExpiredMemberships() {
  const currentDate = new Date();

  // Find all active memberships that have passed their end date
  const expiredMemberships = await prisma.memberInfo.findMany({
    where: {
      status: "ACTIVE",
      endDate: {
        lt: currentDate,
      },
    },
  });

  // Batch update all expired memberships
  if (expiredMemberships.length > 0) {
    await prisma.memberInfo.updateMany({
      where: {
        id: {
          in: expiredMemberships.map((m) => m.id),
        },
      },
      data: {
        status: "EXPIRED",
      },
    });

    console.log(
      `Updated ${expiredMemberships.length} memberships to EXPIRED status`
    );
  }

  return expiredMemberships;
}
