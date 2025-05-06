import React from "react";

import { getCurrentUser } from "@/lib/session";
import AdminPanel from "./AdminPanel";
import CoachPanel from "./CoachPanel";
import MemberPanel from "./MemberPanel";
import { getUserById } from "@/app/actions/getUserById";

const DashboardPage = async () => {
  const user = await getCurrentUser();

  const updatedUser = await getUserById(user?.id as string);

  const getDashboardPanel = () => {
    switch (user?.role) {
      case "ADMIN":
        return <AdminPanel />;
      case "MEMBER":
        return <MemberPanel />;
      case "COACH":
        return <CoachPanel user={user} />;
      default:
        return <div />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-10">
      <h1 className="text-4xl font-bold text-primary-red">
        Hi {user?.firstName} {user?.lastName}
      </h1>
      {updatedUser?.accepted ? (
        getDashboardPanel()
      ) : (
        <div>
          {" "}
          Your request has been sent, wait for admins to accept it to access your
          dashboard
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
