import React from "react";
import { getTranslations } from "next-intl/server";

import UserCard from "./UserCard";

const NewUsersPage = async () => {
  const users = await prisma.user.findMany({
    where: {
      accepted: false,
    },
  });

  const t = await getTranslations("NewUsersPage");

  return (
    <div className="flex flex-col items-center py-10 min-h-screen">
      <div className="w-1/2 flex flex-col gap-5 items-center bg-primary-light p-10 rounded-lg">
        <h1 className="text-4xl font-bold text-primary-blue">{t("Title")}</h1>
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};

export default NewUsersPage;
