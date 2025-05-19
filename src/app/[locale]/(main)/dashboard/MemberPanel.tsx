"use client";

import React from "react";

import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";
import { MemberInfo } from "@prisma/client";
import { getMembershipsByUserId } from "@/app/actions/getMembershipsByUserId";
import Loader from "@/components/loader/Loader";
import MembershipStatusBadge from "@/components/membership-status-badge/MembershipStatusBadge";

const MemberPanel = () => {
  const [membership, setMembership] = React.useState<MemberInfo>(null);
  const [progress, setProgress] = React.useState(0);
  const [membershipOrder, setMembershipOrder] = React.useState<number>(0);
  const { data, status } = useSession();

  React.useEffect(() => {
    const getMembership = async () => {
      const res = await getMembershipsByUserId(data?.user?.id);
      setMembership(res[res.length - 1]);
      setMembershipOrder(res.length);
    };
    getMembership();
  }, [data]);

  React.useEffect(() => {
    const calculatedProgress =
      ((new Date().getTime() - membership?.startDate.getTime()) /
        (membership?.endDate.getTime() - membership?.startDate.getTime())) *
      100;
    setProgress(calculatedProgress);
  }, [membership]);

  if (status === "loading") {
    return <Loader size="lg" />;
  }

  const orderPhrase =
    membershipOrder === 1
      ? "first"
      : membershipOrder === 2
      ? "second"
      : membershipOrder === 3
      ? "third"
      : membershipOrder + "th";

  return (
    <div className="flex flex-col items-center justify-center gap-10 max-w-[50vw] w-full">
      <h1 className="text-5xl font-bold text-primary-blue">Member Panel</h1>
      <div className="flex flex-col p-6 items-center justify-center gap-10 w-full border-y">
        <h3 className="text-xl">Your Membership timeline</h3>
        
          <div className="flex gap-6 w-full max-w-2xl">
            <span>Start: {membership?.startDate?.toLocaleDateString()}</span>
            <Progress value={progress} data-state="loading" />
            <span className="ml-10">
              End: {membership?.endDate?.toLocaleDateString()}
            </span>
          </div>
        <span className="text-xl text-primary-blue font-bold">
          Your {orderPhrase} membership
        </span>
        <div className="flex items-center gap-10 w-full">
          Your Membership Status:{" "}
          <MembershipStatusBadge status={membership?.status} />
        </div>
      </div>
    </div>
  );
};

export default MemberPanel;
