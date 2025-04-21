"use client";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { FlameKindling } from "lucide-react";

import { useRouter } from "@/routes";
import { User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import CoachSubscribersTable from "./CoachSubscribersTable";
import PrivateSessionDrawer from "./PrivateSessionDrawer";
import { createPrivateSession } from "@/app/actions/createPrivateSession";
import formSchema from "@/lib/zod/privateSession";

const CoachPanel = ({ user }: { user: User }) => {
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await createPrivateSession(user.id, values);
    if (response === "success") {
      toast("Private session created successfully");
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="md:w-1/2 pt-10 flex flex-col gap-5 items-center">
      <h1 className="text-center text-4xl font-bold text-primary-blue flex gap-2 items-center">
        Coach Panel for tracking subscribers <FlameKindling size={40}/>
      </h1>
      <div className="w-full flex gap-5 justify-between items-center">
        <Input
          type="text"
          placeholder="Search subscribers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <PrivateSessionDrawer
        user={user}
        loading={loading}
        onSubmit={handleSubmit}
      />
      </div>
      <CoachSubscribersTable coachId={user.id} searchTerm={searchTerm} />
    </div>
  );
};

export default CoachPanel;
