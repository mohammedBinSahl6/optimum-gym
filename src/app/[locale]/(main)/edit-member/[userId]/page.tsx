"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Edit2Icon } from "lucide-react";
import { useSession } from "next-auth/react";

import { User } from "@prisma/client";
import { getUserById } from "@/app/actions/getUserById";
import Loader from "@/components/loader/Loader";
import EditMemberInfoBoard from "../EditMemberInfoBoard";
import EditMemberForm from "../EditMemberForm";

const EditMember = () => {
  const [profile, setProfile] = React.useState<User>();
  const [loading, setLoading] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

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
        <button onClick={() => setIsEdit(!isEdit)} disabled={isEdit} className="disabled:opacity-50 disabled:cursor-not-allowed">
          <Edit2Icon size={32} />
        </button>
      </header>
      {isEdit ? (
        <EditMemberForm userProfile={profile} setIsEdit={setIsEdit} />
      ) : (
        <EditMemberInfoBoard userProfile={profile} />
      )}{" "}
    </div>
  );
};

export default EditMember;
