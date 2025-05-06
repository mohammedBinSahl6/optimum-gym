import React from "react";
import { MemberInfo, User } from "@prisma/client";

import {
  getPrivateSessionsByUserId,
  PrivateSessionResponse,
} from "@/app/actions/getPrivateSessions";
import { getUserById } from "@/app/actions/getUserById";
import { getMembershipsByUserId } from "@/app/actions/getMembershipsByUserId";

interface EditPageUserInfoHook {
  memberships: MemberInfo[];
  privateSessions: PrivateSessionResponse[];
  profile: User;
  loading: boolean;
}

const useEditPageUserInfo = (userId: string): EditPageUserInfoHook => {
  const [memberships, setMemberships] = React.useState<MemberInfo[]>();
  const [profile, setProfile] = React.useState<User>();
  const [loading, setLoading] = React.useState(false);
  const [privateSessions, setPrivateSessions] =
    React.useState<PrivateSessionResponse[]>();

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

    const getPrivateSessions = async () => {
      setLoading(true);
      const res = await getPrivateSessionsByUserId(userId as string);

      if (res) {
        setPrivateSessions(res);
      } else {
        setPrivateSessions([]);
      }
      setLoading(false);
    };

    getPrivateSessions();
  }, [userId]);

  return {
    memberships,
    privateSessions,
    profile,
    loading,
  };
};

export default useEditPageUserInfo;
