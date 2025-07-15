"use client";

import React from "react";
import Image from "next/image";
import type { z } from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import type { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  UserIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import MembershipDrawer from "./MembershipDrawer";
import { toast } from "sonner";
import { handleNewUser } from "@/app/actions/handleNewUser";
import type formSchema from "@/lib/zod/membership";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data, update } = useSession();
  const t = useTranslations("NewUsersPage");

  const handleAcceptAndReject = async (
    user: User,
    action: "accept" | "reject",
    membershipValues?: z.infer<typeof formSchema>
  ) => {
    setLoading(true);
    const response = await handleNewUser(user, action, membershipValues);
    if (response === "error") {
      toast.error(t("UserAcceptedErrorMessage"));
    } else {
      router.refresh();
      toast.success(t("UserAcceptedSuccessMessage"));
      update({
        ...data,
        user: { ...data?.user, accepted: true },
      });
    }
    setLoading(false);
  };

  const onMembershipSubmit = async (values: z.infer<typeof formSchema>) => {
    handleAcceptAndReject(user, "accept", values);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "MEMBER":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      case "COACH":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "ADMIN":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1">
          <div className="relative">
            <Image
              src={user.image ?? "/assets/no-pic.svg"}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full border-4 border-primary-light shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg border border-primary-light/50">
              <UserIcon className="w-4 h-4 text-primary-blue" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-3">
            <div>
              <h3 className="text-xl font-bold text-primary-blue">
                {user.firstName} {user.lastName}
              </h3>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                <Badge className={`${getRoleColor(user.role)} border`}>
                  {user.role}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {user.email && (
                <div className="flex items-center gap-2 text-primary-blue/70">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}

              {user.phoneNumber && (
                <div className="flex items-center gap-2 text-primary-blue/70">
                  <Phone className="w-4 h-4" />
                  <span>{user.phoneNumber}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-primary-blue/70">
                <Calendar className="w-4 h-4" />
                <span>
                  {t("JoinedAt")}:{" "}
                  {user.craetedAt
                    ? new Date(user.craetedAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              {user.address && (
                <div className="flex items-center gap-2 text-primary-blue/70">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{user.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
          {user.role === "MEMBER" ? (
            <MembershipDrawer
              user={user}
              loading={loading}
              onSubmit={onMembershipSubmit}
            />
          ) : (
            <Button
              onClick={() => handleAcceptAndReject(user, "accept")}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t("AcceptButton")}
                </div>
              )}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => handleAcceptAndReject(user, "reject")}
            disabled={loading}
            className="border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-xl font-medium transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              {t("RejectButton")}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
