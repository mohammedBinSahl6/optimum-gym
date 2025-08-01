"use client";

import { useState } from "react";
import { BlogManagement } from "@/components/blog/BlogManagement";
import { SessionManagement } from "@/components/session/SessionManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("blogs");
  const { data } = useSession();

  if (data?.user?.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center ">
        You are not authorized to access this page.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-primary-light/20 to-primary-light-blue/10">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary-blue">
              Content Management Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your blogs and sessions efficiently
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="blogs"
                className="data-[state=active]:bg-primary-red data-[state=active]:text-white"
              >
                Blog Management
              </TabsTrigger>
              <TabsTrigger
                value="sessions"
                className="data-[state=active]:bg-primary-light-blue data-[state=active]:text-white"
              >
                Session Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blogs" className="space-y-4">
              <BlogManagement />
            </TabsContent>

            <TabsContent value="sessions" className="space-y-4">
              <SessionManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
