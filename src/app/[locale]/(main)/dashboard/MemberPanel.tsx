"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  User,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Clock,
  DollarSign,
  Activity,
  Users,
  Star,
  Trophy,
  Zap,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Loader from "@/components/loader/Loader";
import MembershipStatusBadge from "@/components/membership-status-badge/MembershipStatusBadge";
import {
  getMemberStatistics,
  type MemberStatistics,
} from "@/app/actions/getMemberStatistics";

const MemberPanel = () => {
  const [statistics, setStatistics] = React.useState<MemberStatistics | null>(
    null
  );
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const { data, status } = useSession();
  const t = useTranslations("MemberPanel");

  React.useEffect(() => {
    const fetchStatistics = async () => {
      if (!data?.user?.id) return;

      setLoading(true);
      const stats = await getMemberStatistics(data.user.id);
      setStatistics(stats);
      setLoading(false);
    };

    if (data?.user?.id) {
      fetchStatistics();
    }
  }, [data?.user?.id]);

  React.useEffect(() => {
    if (statistics?.currentMembership) {
      const { startDate, endDate } = statistics.currentMembership;
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      const calculatedProgress = ((now - start) / (end - start)) * 100;
      setProgress(Math.min(Math.max(calculatedProgress, 0), 100));
    }
  }, [statistics]);

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5 w-full max-w-5xl">
        <Loader size="lg" />
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5">
        <div className="text-center space-y-4">
          <User className="w-16 h-16 text-primary-red mx-auto" />
          <h1 className="text-4xl font-bold text-primary-red">
            {t("NoDataAvailable")}
          </h1>
        </div>
      </div>
    );
  }

  const getOrderPhrase = (order: number) => {
    if (order === 1) return t("Initial");
    if (order === 2) return t("Complete", { context: "second" });
    if (order === 3) return t("Complete", { context: "third" });
    return t("Complete", { context: "other", count: order });
  };

  const achievementsList = [
    {
      key: "loyalMember",
      title: t("LoyalMember"),
      description: t("MemberForOverYear"),
      icon: Heart,
      color: "from-red-500 to-pink-500",
    },
    {
      key: "consistentMember",
      title: t("ConsistentMember"),
      description: t("MultipleActiveMemberships"),
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
    },
    {
      key: "premiumMember",
      title: t("PremiumMember"),
      description: t("HighValueMember"),
      icon: Star,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5 w-full max-w-5xl">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={data?.user?.image ?? "/assets/no-pic.svg"}
                  alt="Profile Picture"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-primary-light shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border border-primary-light/50">
                  <User className="w-4 h-4 text-primary-blue" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-red to-primary-blue bg-clip-text text-transparent">
                  {t("WelcomeBack")}, {data?.user?.firstName}!
                </h1>
                <p className="text-primary-blue/70 mt-1">
                  {t("FitnessJourneyDashboard")}
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-primary-blue/70">{t("MemberSince")}</p>
              <p className="text-lg font-semibold text-primary-blue">
                {statistics.memberSince.toLocaleDateString()}
              </p>
              <p className="text-sm text-primary-blue/70">
                {statistics.daysAsMember} {t("DaysAgo")}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-primary-light/30 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-blue/70">
                {t("TotalMemberships")}
              </CardTitle>
              <div className="p-2 bg-gradient-to-r from-primary-blue to-primary-light-blue rounded-lg">
                <Award className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-blue">
                {statistics.totalMemberships}
              </div>
              <p className="text-xs text-primary-blue/60 mt-1">
                {statistics.activeMemberships} {t("Active")},{" "}
                {statistics.expiredMemberships} {t("Expired")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-primary-light/30 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-blue/70">
                {t("PrivateSessions")}
              </CardTitle>
              <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <Users className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-blue">
                {statistics.totalPrivateSessions}
              </div>
              <p className="text-xs text-primary-blue/60 mt-1">
                {statistics.completedSessions} {t("Completed")},{" "}
                {statistics.upcomingSessions} {t("Upcoming")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-primary-light/30 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-blue/70">
                {t("CurrentStreak")}
              </CardTitle>
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Activity className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-blue">
                {statistics.currentStreak}
              </div>
              <p className="text-xs text-primary-blue/60 mt-1">
                {t("DaysActive")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-primary-light/30 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary-blue/70">
                {t("TotalInvested")}
              </CardTitle>
              <div className="p-2 bg-gradient-to-r from-primary-red to-primary-red/80 rounded-lg">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-blue">
                ${statistics.totalSpent.toFixed(0)}
              </div>
              <p className="text-xs text-primary-blue/60 mt-1">
                ${statistics.averageMonthlySpend.toFixed(0)} {t("MonthAvg")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Membership Progress */}
        {statistics.currentMembership && (
          <Card className="bg-white/80 backdrop-blur-sm border-primary-light/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-primary-blue flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {t("YourMembership")}{" "}
                    {getOrderPhrase(statistics.totalMemberships)}
                  </CardTitle>
                  <p className="text-primary-blue/70 mt-1">
                    {statistics.currentMembership.plan}
                  </p>
                </div>
                <MembershipStatusBadge
                  status={statistics.currentMembership.status}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary-blue/70">
                    {t("Initial")}:{" "}
                    {new Date(
                      statistics.currentMembership.startDate
                    ).toLocaleDateString()}
                  </span>
                  <span className="text-primary-blue/70">
                    {t("Current")}:{" "}
                    {new Date(
                      statistics.currentMembership.endDate
                    ).toLocaleDateString()}
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-3 bg-primary-light/30"
                />
                <div className="text-center">
                  <span className="text-lg font-semibold text-primary-blue">
                    {progress.toFixed(1)}% {t("Complete")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Tracking */}
        {(statistics.weightProgress.initial ||
          statistics.heightProgress.initial) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statistics.weightProgress.initial && (
              <Card className="bg-white/80 backdrop-blur-sm border-primary-light/30">
                <CardHeader>
                  <CardTitle className="text-lg text-primary-blue flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    {t("WeightProgress")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-primary-blue/70">
                        {t("Initial")}:
                      </span>
                      <span className="font-semibold text-primary-blue">
                        {statistics.weightProgress.initial} kg
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-blue/70">
                        {t("Current")}:
                      </span>
                      <span className="font-semibold text-primary-blue">
                        {statistics.weightProgress.current} kg
                      </span>
                    </div>
                    {statistics.weightProgress.change !== null && (
                      <div className="flex justify-between items-center">
                        <span className="text-primary-blue/70">
                          {t("Change")}:
                        </span>
                        <div className="flex items-center gap-1">
                          {statistics.weightProgress.change > 0 ? (
                            <TrendingUp className="w-4 h-4 text-red-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-green-500" />
                          )}
                          <span
                            className={`font-semibold ${
                              statistics.weightProgress.change > 0
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {Math.abs(statistics.weightProgress.change).toFixed(
                              1
                            )}{" "}
                            kg
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {statistics.heightProgress.initial && (
              <Card className="bg-white/80 backdrop-blur-sm border-primary-light/30">
                <CardHeader>
                  <CardTitle className="text-lg text-primary-blue flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    {t("HeightInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-primary-blue/70">
                        {t("Height")}:
                      </span>
                      <span className="font-semibold text-primary-blue">
                        {statistics.heightProgress.current} cm
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Achievements */}
        <Card className="bg-white/80 backdrop-blur-sm border-primary-light/30">
          <CardHeader>
            <CardTitle className="text-xl text-primary-blue flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              {t("YourAchievements")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievementsList.map((achievement) => {
                const isUnlocked =
                  statistics.achievements[
                    achievement.key as keyof typeof statistics.achievements
                  ];
                return (
                  <div
                    key={achievement.key}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      isUnlocked
                        ? "bg-gradient-to-r " +
                          achievement.color +
                          " text-white shadow-lg"
                        : "bg-gray-100 border-gray-200 text-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <achievement.icon
                        className={`w-6 h-6 ${
                          isUnlocked ? "text-white" : "text-gray-400"
                        }`}
                      />
                      <div>
                        <h4
                          className={`font-semibold ${
                            isUnlocked ? "text-white" : "text-gray-600"
                          }`}
                        >
                          {achievement.title}
                        </h4>
                        <p
                          className={`text-sm ${
                            isUnlocked ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Private Sessions */}
        {statistics.privateSessions.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-primary-light/30">
            <CardHeader>
              <CardTitle className="text-xl text-primary-blue flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {t("RecentPrivateSessions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statistics.privateSessions
                  .slice(0, 3)
                  .map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-primary-blue/5 rounded-xl"
                    >
                      <Image
                        src={session.coach.image ?? "/assets/no-pic.svg"}
                        alt="Coach"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-primary-light"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary-blue">
                          {session.coach.firstName} {session.coach.lastName}
                        </h4>
                        <p className="text-sm text-primary-blue/70">
                          {new Date(
                            session.startSessionDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-primary-blue/10 text-primary-blue border-primary-blue/20">
                        {session.sessionsNumber} {t("Sessions")}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MemberPanel;
