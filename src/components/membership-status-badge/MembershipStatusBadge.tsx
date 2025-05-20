import React from "react";

import { cn } from "@/lib/utils";
import { SubscriptionStatus } from "@prisma/client";

type MembershipStatusBadgeProps = {
  status: `${SubscriptionStatus}`;
};
const MembershipStatusBadge = ({ status }: MembershipStatusBadgeProps) => {

    if (!status) return null;
  return (
    <div
      className={cn("p-5 capitalize rounded-md w-fit font-bold", {
        "bg-green-200 text-green-950": status === "ACTIVE",
        "bg-red-200 text-red-950": status === "EXPIRED",
        "bg-yellow-200 text-yellow-950": status === "UNACTIVE",
        "bg-gray-200 text-gray-950": status === "CANCELLED",
      })}
    >
      {status.toLocaleLowerCase()}
    </div>
  );
};

export default MembershipStatusBadge;
