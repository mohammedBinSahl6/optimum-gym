"use server";

import prisma from "@/lib/prisma";

interface PercentageChange {
  value: number; // The percentage change (e.g., 12 for 12%)
  isPositive: boolean; // Whether the change is positive or negative
}

export interface MembershipStatistics {
  activeMembers: number; // Current count of active members
  totalMembers: number; // Current total members
  expiredMemberships: number; // Count of expired memberships
  expiringSoon: number; // Count of memberships expiring soon
  activeChange: PercentageChange; // Percentage change for active members
  totalChange: PercentageChange; // Percentage change for total members
  expiredChange: PercentageChange; // Percentage change for expired memberships
  expiringChange: PercentageChange; // Percentage change for expiring soon
}

export const getMembershipStatistics =
  async (): Promise<MembershipStatistics> => {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Get current period stats
    const [currentStats, previousStats] = await Promise.all([
      getStatsForPeriod(currentDate),
      getStatsForPeriod(oneMonthAgo),
    ]);

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return { value: 0, isPositive: true }; // avoid division by zero
      const change = ((current - previous) / previous) * 100;
      return {
        value: Math.round(change),
        isPositive: change >= 0,
      };
    };

    return {
      activeMembers: currentStats.activeMembers,
      totalMembers: currentStats.totalMembers,
      expiredMemberships: currentStats.expiredMemberships,
      expiringSoon: currentStats.expiringSoon,
      activeChange: calculateChange(
        currentStats.activeMembers,
        previousStats.activeMembers
      ),
      totalChange: calculateChange(
        currentStats.totalMembers,
        previousStats.totalMembers
      ),
      expiredChange: calculateChange(
        currentStats.expiredMemberships,
        previousStats.expiredMemberships
      ),
      expiringChange: calculateChange(
        currentStats.expiringSoon,
        previousStats.expiringSoon
      ),
    };
  };

async function getStatsForPeriod(referenceDate: Date) {
  // Get start and end of the month for the reference date
  const startOfMonth = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth() + 1,
    0
  );

  // Get total members (count as of end of month)
  const totalMembers = await prisma.user.count({
    where: {
      role: "MEMBER",
      craetedAt: { lte: endOfMonth },
    },
  });

  // Get active members (active on the last day of the month)
  const activeMembers = await prisma.memberInfo.count({
    where: {
      status: "ACTIVE",
      startDate: { lte: endOfMonth },
      endDate: { gte: endOfMonth },
    },
  });

  // Get expired memberships (expired during this month)
  const expiredMemberships = await prisma.memberInfo.count({
    where: {
      OR: [
        { status: "EXPIRED", endDate: { gte: startOfMonth, lte: endOfMonth } },
        {
          endDate: { gte: startOfMonth, lte: endOfMonth },
          status: { not: "CANCELLED" },
        },
      ],
    },
  });

  // Get memberships that were expiring soon (within 30 days) at month's end
  const soonCutoff = new Date(endOfMonth);
  soonCutoff.setDate(soonCutoff.getDate() + 30);

  const expiringSoon = await prisma.memberInfo.count({
    where: {
      endDate: {
        gte: endOfMonth,
        lte: soonCutoff,
      },
      status: "ACTIVE",
    },
  });

  return {
    activeMembers,
    totalMembers,
    expiredMemberships,
    expiringSoon,
  };
}
