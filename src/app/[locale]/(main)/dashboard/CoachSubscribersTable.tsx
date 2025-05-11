"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/loader/Loader";
import {
  getPrivateSubscribers,
  Subscriber,
} from "@/app/actions/getPrivateSubscribers";
import PrivateSessionSubscriberModal from "./PrivateSessionSubscriberModal";

interface CoachSubscribersTableProps {
  coachId: string;
  searchTerm: string;
}

export default function CoachSubscribersTable({
  coachId,
  searchTerm,
}: CoachSubscribersTableProps) {
  const [subscribers, setSubscribers] = React.useState<Subscriber>([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const t = useTranslations("DashboardPage");

  useEffect(() => {
    const getSubscribers = async () => {
      setLoading(true);
      const response = await getPrivateSubscribers(coachId);
      if (response === "error") {
        return;
      }
      setSubscribers(response);
    };
    getSubscribers();
    setLoading(false);
  }, [coachId, refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Table className="w-full">
      <TableCaption>{t("CoachTableCaption")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center ">
            {t("CoachTableHeader.Picture")}
          </TableHead>
          <TableHead className="text-center">
            {t("CoachTableHeader.Name")}
          </TableHead>
          <TableHead className="text-center">
            {t("CoachTableHeader.StartingDate")}
          </TableHead>
          <TableHead className="text-center">
            {t("CoachTableHeader.Sessions")}
          </TableHead>
          <TableHead className="text-center">
            {t("CoachTableHeader.Actions")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscribers
          .filter((subscriber) => "privateSessionsAsMember" in subscriber)
          .filter(
            (subscriber) =>
              subscriber.firstName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              subscriber.lastName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
          .map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell className="font-medium flex justify-center items-center">
                <Image
                  src={subscriber.image ?? "/assets/no-pic.svg"}
                  alt="Profile Picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell className="text-center">
                {subscriber.firstName} {subscriber.lastName}
              </TableCell>
              <TableCell className="text-center">
                {subscriber.privateSessionsAsMember?.[
                  subscriber.privateSessionsAsMember?.length - 1
                ]?.startSessionDate.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                {
                  subscriber.privateSessionsAsMember?.[
                    subscriber.privateSessionsAsMember?.length - 1
                  ]?.sessionsNumber
                }
              </TableCell>
              <TableCell className="text-center">
                <PrivateSessionSubscriberModal
                  setRefresh={setRefresh}
                  refresh={refresh}
                  subscriberId={subscriber.id}
                  currentSession={
                    subscriber.privateSessionsAsMember?.[
                      subscriber.privateSessionsAsMember?.length - 1
                    ]
                  }
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>{t("TotalSubscribersLabel")}</TableCell>
          <TableCell className="text-right">{subscribers.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
