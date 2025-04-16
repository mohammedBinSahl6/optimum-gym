import React from "react";

import { getCurrentUser } from "@/lib/session";
import AdminPanel from "./AdminPanel";
import CoachPanel from "./CoachPanel";

const DashboardPage = async () => {
  const user = await getCurrentUser();

  const getDashboardPanel = () => {
    switch (user?.role) {
      case "ADMIN":
        return <AdminPanel />;
      // case "MEMBER":
      //   return <MemberPanel />;
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
      {user?.accepted ? (
        getDashboardPanel()
      ) : (
        <div>
          {" "}
          Your request has sent, wait for admins to accept it to access your
          dashboard
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
