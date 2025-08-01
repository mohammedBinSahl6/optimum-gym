"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getFilterdMembers,
  type MembersBoard,
} from "@/app/actions/getFilterdMembers";
import Loader from "@/components/loader/Loader";
import { Link } from "@/i18n/routes";
import {
  Edit,
  Eye,
  Mail,
  Phone,
  Calendar,
  Users,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MembersTableProps {
  filter: string;
  searchTerm: string;
}

export default function MembersTable({
  filter,
  searchTerm,
}: MembersTableProps) {
  const [members, setMembers] = React.useState<MembersBoard>([]);
  const [loading, setLoading] = React.useState(false);
  const t = useTranslations("DashboardPage");

  useEffect(() => {
    const getMembers = async () => {
      setLoading(true);
      const response = await getFilterdMembers(filter);
      if (response === "error") {
        setLoading(false);
        return;
      }
      setMembers(response);
      setLoading(false);
    };
    getMembers();
  }, [filter]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "expired":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      case "unactve":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "ACTIVE":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case "EXPIRED":
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      case "UNACTIVE":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />;
    }
  };

  const filteredMembers = members
    .filter((member) => "MemberInfo" in member)
    .filter(
      (member) =>
        member.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (filteredMembers.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-primary-light mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-primary-blue mb-2">
          No Members Found
        </h3>
        <p className="text-primary-blue/70">
          {searchTerm
            ? "Try adjusting your search terms"
            : "No members match the current filter"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Table Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-blue mb-2">
          {t("MembersTableCaption")}
        </h3>
        <p className="text-primary-blue/70">
          Showing {filteredMembers.length} members
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow className="border-primary-light/30">
              <TableHead className="text-primary-blue font-semibold">
                {t("MembersTableHeader.Picture")}
              </TableHead>
              <TableHead className="text-primary-blue font-semibold">
                {t("MembersTableHeader.Name")}
              </TableHead>
              <TableHead className="text-primary-blue font-semibold">
                Contact
              </TableHead>
              <TableHead className="text-primary-blue font-semibold">
                {t("MembersTableHeader.Status")}
              </TableHead>
              <TableHead className="text-primary-blue font-semibold">
                {t("MembersTableHeader.ExpDate")}
              </TableHead>
              <TableHead className="text-primary-blue font-semibold text-right">
                {t("MembersTableHeader.Actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => {
              const latestMembership =
                member.MemberInfo[member.MemberInfo.length - 1];
              return (
                <TableRow
                  key={member.id}
                  className="border-primary-light/20 hover:bg-primary-blue/5 transition-colors"
                >
                  <TableCell>
                    <div className="relative">
                      <Image
                        src={member.image ?? "/assets/no-pic.svg"}
                        alt="Profile Picture"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-primary-light"
                      />
                      <div className="absolute -bottom-1 -right-1">
                        {getStatusIcon(latestMembership?.status)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-primary-blue">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-sm text-primary-blue/60">
                        @{member.username}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {member.email && (
                        <div className="flex items-center gap-2 text-sm text-primary-blue/70">
                          <Mail className="w-3 h-3" />
                          <span className="truncate max-w-[150px]">
                            {member.email}
                          </span>
                        </div>
                      )}
                      {member.phoneNumber && (
                        <div className="flex items-center gap-2 text-sm text-primary-blue/70">
                          <Phone className="w-3 h-3" />
                          <span>{member.phoneNumber}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "border",
                        getStatusColor(latestMembership?.status)
                      )}
                    >
                      <div className="flex items-center gap-2 capitalize">
                        {getStatusIcon(latestMembership?.status)}
                        {latestMembership?.status.toLocaleLowerCase() || 'Not subscribed'}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-3 h-3 text-primary-blue/50" />
                      <span className="text-primary-blue/70">
                        {latestMembership?.endDate
                          ? latestMembership.endDate.toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary-light hover:bg-primary-light/20 bg-transparent"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Link href={`/edit-member/${member.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary-blue to-primary-light-blue text-white"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          {t("EditMemberButton")}
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredMembers.map((member) => {
          const latestMembership =
            member.MemberInfo[member.MemberInfo.length - 1];
          return (
            <div
              key={member.id}
              className="bg-white/60 rounded-xl border border-primary-light/30 p-4 space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Image
                    src={member.image ?? "/assets/no-pic.svg"}
                    alt="Profile Picture"
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-primary-light"
                  />
                  <div className="absolute -bottom-1 -right-1">
                    {getStatusIcon(latestMembership?.status)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-primary-blue truncate">
                    {member.firstName} {member.lastName}
                  </h4>
                  <p className="text-sm text-primary-blue/60">
                    @{member.username}
                  </p>
                  <Badge
                    className={cn(
                      "border mt-2",
                      getStatusColor(latestMembership?.status)
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(latestMembership?.status)}
                      {latestMembership?.status || "Unknown"}
                    </div>
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {member.email && (
                  <div className="flex items-center gap-2 text-primary-blue/70">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                )}
                {member.phoneNumber && (
                  <div className="flex items-center gap-2 text-primary-blue/70">
                    <Phone className="w-3 h-3" />
                    <span>{member.phoneNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-primary-blue/70 col-span-2">
                  <Calendar className="w-3 h-3" />
                  <span>
                    Expires:{" "}
                    {latestMembership?.endDate
                      ? latestMembership.endDate.toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-primary-light/30">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-primary-light hover:bg-primary-light/20 bg-transparent"
                >
                  <Eye className="w-3 h-3 mr-2" />
                  View
                </Button>
                <Link href={`/edit-member/${member.id}`} className="flex-1">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary-blue to-primary-light-blue text-white"
                  >
                    <Edit className="w-3 h-3 mr-2" />
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t border-primary-light/30">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary-blue/70">
            Showing {filteredMembers.length} of {members.length} members
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-primary-blue/70">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-primary-blue/70">Inactive</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3 h-3 text-red-500" />
              <span className="text-primary-blue/70">Expired</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
