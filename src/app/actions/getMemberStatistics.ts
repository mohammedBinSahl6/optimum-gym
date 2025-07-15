"use server";

import prisma from "@/lib/prisma";
import { MemberInfo } from "@prisma/client";

export interface MemberStatistics {
  // Membership Stats
  totalMemberships: number;
  activeMemberships: number;
  expiredMemberships: number;
  currentMembership: MemberInfo | null;
  membershipHistory: MemberInfo[];

  // Private Session Stats
  totalPrivateSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  privateSessions: any[];

  // Progress Stats
  memberSince: Date;
  daysAsMember: number;
  currentStreak: number;

  // Physical Progress (if available)
  weightProgress: {
    initial: number | null;
    current: number | null;
    change: number | null;
  };
  heightProgress: {
    initial: number | null;
    current: number | null;
  };

  // Financial Stats
  totalSpent: number;
  averageMonthlySpend: number;

  // Achievement Stats
  achievements: {
    loyalMember: boolean; // More than 1 year
    consistentMember: boolean; // Multiple active memberships
    premiumMember: boolean; // High-value memberships
  };
}

export const getMemberStatistics = async (
  userId: string
): Promise<MemberStatistics | null> => {
  try {
    // Get user info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        MemberInfo: {
          orderBy: { startDate: "asc" },
        },
        privateSessionsAsMember: {
          include: {
            coach: {
              select: {
                firstName: true,
                lastName: true,
                image: true,
              },
            },
          },
          orderBy: { startSessionDate: "desc" },
        },
      },
    });

    if (!user) return null;

    const memberships = user.MemberInfo;
    const privateSessions = user.privateSessionsAsMember;
    const currentDate = new Date();

    // Current membership (latest active or most recent)
    const currentMembership =
      memberships.find(
        (m) => m.status === "ACTIVE" && m.endDate > currentDate
      ) || memberships[memberships.length - 1];

    // Membership statistics
    const activeMemberships = memberships.filter(
      (m) => m.status === "ACTIVE" && m.endDate > currentDate
    ).length;

    const expiredMemberships = memberships.filter(
      (m) => m.status === "EXPIRED" || m.endDate < currentDate
    ).length;

    // Member since calculation
    const memberSince = user.craetedAt || new Date();
    const daysAsMember = Math.floor(
      (currentDate.getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Private session statistics
    const totalPrivateSessions = privateSessions.reduce(
      (sum, session) => sum + session.sessionsNumber,
      0
    );
    const upcomingSessions = privateSessions.filter(
      (session) => session.startSessionDate > currentDate
    ).length;

    // Weight progress calculation
    const firstMembership = memberships[0];
    const latestMembership = memberships[memberships.length - 1];

    const weightProgress = {
      initial: firstMembership?.weight || null,
      current: latestMembership?.weight || null,
      change:
        firstMembership?.weight && latestMembership?.weight
          ? latestMembership.weight - firstMembership.weight
          : null,
    };

    const heightProgress = {
      initial: firstMembership?.height || null,
      current: latestMembership?.height || null,
    };

    // Financial calculations
    const totalSpent = memberships.reduce(
      (sum, membership) => sum + membership.subscriptionCost,
      0
    );
    const monthsAsMember = Math.max(1, Math.floor(daysAsMember / 30));
    const averageMonthlySpend = totalSpent / monthsAsMember;

    // Achievement calculations
    const achievements = {
      loyalMember: daysAsMember > 365,
      consistentMember: activeMemberships > 0 && memberships.length > 1,
      premiumMember: totalSpent > 1000, // Adjust threshold as needed
    };

    // Current streak calculation (simplified - days since last membership started)
    const currentStreak = currentMembership
      ? Math.floor(
          (currentDate.getTime() - currentMembership.startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

    return {
      totalMemberships: memberships.length,
      activeMemberships,
      expiredMemberships,
      currentMembership,
      membershipHistory: memberships,

      totalPrivateSessions,
      completedSessions: totalPrivateSessions - upcomingSessions,
      upcomingSessions,
      privateSessions,

      memberSince,
      daysAsMember,
      currentStreak,

      weightProgress,
      heightProgress,

      totalSpent,
      averageMonthlySpend,

      achievements,
    };
  } catch (error) {
    console.error("Error fetching member statistics:", error);
    return null;
  }
};
