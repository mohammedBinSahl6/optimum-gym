"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Edit2Icon } from "lucide-react";
import { useSession } from "next-auth/react";

import { MemberInfo, User } from "@prisma/client";
import { getUserById } from "@/app/actions/getUserById";
import Loader from "@/components/loader/Loader";
import EditMemberInfoBoard from "../EditMemberInfoBoard";
import EditMemberForm from "../EditMemberForm";
import { cn } from "@/lib/utils";
import { getMembershipsByUserId } from "@/app/actions/getMembershipsByUserId";

const EditMember = () => {
  const [profile, setProfile] = React.useState<User>();
  const [loading, setLoading] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const [memberships, setMemberships] = React.useState<MemberInfo[]>();

  const { data } = useSession();
  const { userId } = useParams();

  React.useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const response = await getUserById(userId as string);
      if (response) {
        setProfile(response);
      }
      setLoading(false);
    };
    getProfile();

    const getMemberships = async () => {
      setLoading(true);
      const res = await getMembershipsByUserId(userId as string);

      if (res) {
        setMemberships(res);
      } else {
        setMemberships([]);
      }
      setLoading(false);
    };
    getMemberships();
  }, [userId]);

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
        {memberships?.map((membership, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 p-6 bg-primary-blue rounded-xl min-w-72"
          >
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
        ))}
      </div>
    </div>
  );
};

export default EditMember;
