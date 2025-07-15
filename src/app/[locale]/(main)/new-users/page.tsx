import { getTranslations } from "next-intl/server";
import { Users, UserPlus, Clock } from "lucide-react";
import UserCard from "./UserCard";
import prisma from "@/lib/prisma"; // Assuming you have prisma instance

const NewUsersPage = async () => {
  const users = await prisma.user.findMany({
    where: {
      accepted: false,
    },
    orderBy: {
      craetedAt: "desc",
    },
  });

  const t = await getTranslations("NewUsersPage");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-primary-blue to-primary-light-blue rounded-xl">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-red to-primary-blue bg-clip-text text-transparent">
                    {t("Title")}
                  </h1>
                  <p className="text-primary-blue/70 mt-1">
                    Review and approve new member registrations
                  </p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-r from-primary-red/10 to-primary-blue/10 rounded-xl p-4 border border-primary-light/30">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-red" />
                  <div>
                    <p className="text-sm text-primary-blue/70">
                      Pending Approvals
                    </p>
                    <p className="text-2xl font-bold text-primary-red">
                      {users.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users List */}
        {users.length > 0 ? (
          <div className="space-y-6">
            <div className="grid gap-6">
              {users.map((user) => (
                <UserCard user={user} key={user.id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-12 text-center">
            <Users className="w-16 h-16 text-primary-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary-blue mb-2">
              No Pending Users
            </h3>
            <p className="text-primary-blue/70">
              All user registrations have been processed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewUsersPage;
