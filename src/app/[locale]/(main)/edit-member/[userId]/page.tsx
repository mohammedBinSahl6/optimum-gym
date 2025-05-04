"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Edit2Icon } from "lucide-react";
import { useSession } from "next-auth/react";

import Loader from "@/components/loader/Loader";
import EditMemberInfoBoard from "../EditMemberInfoBoard";
import EditMemberForm from "../EditMemberForm";
import { cn } from "@/lib/utils";
import { PrivateSessionResponse } from "@/app/actions/getPrivateSessions";
import useEditPageUserInfo from "@/hooks/useEditPageUserInfo";
import MoreInfoMembershipModal from "../MoreInfoMembershipModal";

const EditMember = () => {
  const [isEdit, setIsEdit] = React.useState(false);

  React.useState<PrivateSessionResponse[]>();

  const { data } = useSession();
  const { userId } = useParams();
  const { memberships, privateSessions, profile, loading } =
    useEditPageUserInfo(userId as string);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 min-h-screen">
        <h1 className="text-4xl font-bold text-primary-red">User not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen md:p-10">
      <header className="flex w-3/4 justify-between items-center">
        <h1 className="text-4xl font-bold text-primary-red">
          {userId === data?.user?.id
            ? "Hi " + data?.user?.firstName + " " + data?.user?.lastName
            : profile?.firstName + " " + profile?.lastName}
          &rsquo;s profile
        </h1>
        <button
          onClick={() => setIsEdit(!isEdit)}
          disabled={isEdit}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Edit2Icon size={32} />
        </button>
      </header>
      {isEdit ? (
        <EditMemberForm userProfile={profile} setIsEdit={setIsEdit} />
      ) : (
        <EditMemberInfoBoard userProfile={profile} />
      )}

      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-4xl font-bold text-primary-blue">Memberships</h1>
        {memberships?.length ? (
          memberships?.map((membership, index) => (
            <MoreInfoMembershipModal key={index} membership={membership}>
              <div className="flex flex-col gap-5 p-6 bg-primary-blue rounded-xl min-w-72 cursor-pointer">
                <span className="text-white">
                  Start: {membership.startDate.toLocaleDateString()}
                </span>
                <span className="text-white">
                  End: {membership.endDate.toLocaleDateString()}
                </span>
                <span
                  className={cn(
                    "bg-primary-light p-3 rounded-sm w-fit text-sm text-primary-blue",
                    {
                      "text-primary-red": membership.status === "EXPIRED",
                    }
                  )}
                >
                  {membership.status}
                </span>
              </div>
            </MoreInfoMembershipModal>
          ))
        ) : (
          <span>No Memberships</span>
        )}
      </div>
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-4xl font-bold text-primary-blue">
          Private Sessions
        </h1>
        {privateSessions?.length ? (
          privateSessions?.map((session, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 p-6 bg-primary-red rounded-xl min-w-72"
            >
              <span className="text-white">
                <span className="font-bold">Coach: </span>
                {session.coach.firstName} {session.coach.lastName}
              </span>
              <span className="text-white">
                <span className="font-bold">Start Date: </span>
                {session.startSessionDate.toLocaleDateString()}
              </span>
              <span className="text-white">
                <span className="font-bold">Left: </span>
                {session.sessionsNumber}
              </span>
            </div>
          ))
        ) : (
          <span>No Private Sessions</span>
        )}
      </div>
    </div>
  );
};

export default EditMember;
