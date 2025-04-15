import { getCurrentUser } from "@/lib/session";
import React from "react";
import AdminPanel from "./AdminPanel";

const DashboardPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold text-primary-red">
        Hi {user?.firstName} {user?.lastName}
      </h1>
      {user?.role === "ADMIN" ? <AdminPanel /> : <div />}
    </div>
  );
};

export default DashboardPage;
