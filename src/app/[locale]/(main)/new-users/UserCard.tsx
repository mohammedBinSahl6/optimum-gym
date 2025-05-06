"use client";

import React from "react";
import Image from "next/image";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import MembershipDrawer from "./MembershipDrawer";
import { toast } from "sonner";
import { handleNewUser } from "@/app/actions/handleNewUser";
import formSchema from "@/lib/zod/membership";

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
      toast(t("UserAcceptedSuccessMessage"));
      update({
        ...data,
        user: { ...data.user, accepted: true },
      });
    }
    setLoading(false);
  };

  const onMembershipSubmit = async (values: z.infer<typeof formSchema>) => {
    handleAcceptAndReject(user, "accept", values);
  };

  return (
    <div
      key={user.id}
      className="flex gap-5 items-center p-8 bg-white rounded-lg w-full justify-between"
    >
      <Image
        src={user.image ?? "/assets/no-pic.svg"}
        alt="Profile Picture"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex gap-5 flex-col">
        <span className="flex gap-4 items-center font-bold">
          {user.firstName} {user.lastName}
        </span>
        <p className="text-sm text-primary-red">
          {t("JoinedAt")}:{user.craetedAt.toLocaleDateString()}
        </p>
      </div>
      <span>
        As <span className="text-primary-red">{user.role}</span>
      </span>
      <div className="flex gap-5 items-center flex-col">
        {user.role === "MEMBER" ? (
          <MembershipDrawer
            user={user}
            loading={loading}
            onSubmit={onMembershipSubmit}
          />
        ) : (
          <Button
            variant="blue"
            onClick={() => handleAcceptAndReject(user, "accept")}
            loading={loading}
          >
            {t("AcceptButton")}
          </Button>
        )}

        <Button variant="default">{t("RejectButton")}</Button>
      </div>
    </div>
  );
};

export default UserCard;
