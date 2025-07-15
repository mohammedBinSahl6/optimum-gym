"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  Filter,
} from "lucide-react";
import MembersTable from "./MembersTable";
import FilterDropdown from "./FilterDropdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MembershipStatistics } from "@/app/actions/getMembershipStats";

const AdminPanel = ({ stats }: { stats: MembershipStatistics }) => {
  const [filter, setFilter] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const t = useTranslations("DashboardPage");

  const cardStats = [
    {
      title: "Active Members",
      value: stats.activeMembers.toString(),
      change: `${stats.activeChange.isPositive ? "+" : ""}${
        stats.activeChange.value
      }%`,
      changeType:
        stats.activeChange.value === 0
          ? "neutral"
          : stats.activeChange.isPositive
          ? "positive"
          : "negative",
      icon: UserCheck,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Total Members",
      value: stats.totalMembers.toString(),
      change: `${stats.totalChange.isPositive ? "+" : ""}${
        stats.totalChange.value
      }%`,
      changeType:
        stats.totalChange.value === 0
          ? "neutral"
          : stats.totalChange.isPositive
          ? "positive"
          : "negative",
      icon: Users,
      color: "from-primary-blue to-primary-light-blue",
    },
    {
      title: "Expired Memberships",
      value: stats.expiredMemberships.toString(),
      change: `${stats.expiredChange.isPositive ? "+" : ""}${
        stats.expiredChange.value
      }%`,
      changeType:
        stats.expiredChange.value === 0
          ? "neutral"
          : stats.expiredChange.isPositive
          ? "positive"
          : "negative",
      icon: UserX,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Expiring Soon",
      value: stats.expiringSoon.toString(),
      change: `${stats.expiringChange.isPositive ? "+" : ""}${
        stats.expiringChange.value
      }%`,
      changeType:
        stats.expiringChange.value === 0
          ? "neutral"
          : stats.expiringChange.isPositive
          ? "positive"
          : "negative",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-primary-blue to-primary-light-blue rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-red to-primary-blue bg-clip-text text-transparent">
                  Members Dashboard
                </h1>
                <p className="text-primary-blue/70 mt-1">
                  Manage and monitor all gym members
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-primary-light/30 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary-blue/70">
                  {stat.title}
                </CardTitle>
                <div
                  className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg`}
                >
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary-blue">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp
                    className={`w-3 h-3 ${
                      stat.changeType === "positive"
                        ? "text-green-500"
                        : stat.changeType === "negative"
                        ? "text-red-500 rotate-180"
                        : "text-yellow-500"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-blue/50 w-4 h-4" />
                <Input
                  placeholder={t("SearchPlaceholder")}
                  type="text"
                  className="pl-10 border-primary-light/50 focus:border-primary-blue focus:ring-primary-blue/20 rounded-xl h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <FilterDropdown filter={filter} setFilter={setFilter} />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="border-primary-light hover:bg-primary-light/20 text-primary-blue rounded-xl"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 overflow-hidden">
          <MembersTable filter={filter} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
