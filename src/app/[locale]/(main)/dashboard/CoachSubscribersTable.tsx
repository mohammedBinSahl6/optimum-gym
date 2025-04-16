'use client'
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
import React, { useEffect } from "react";

import Loader from "@/components/loader/Loader";
import {
  getPrivateSubscribers,
  Subscriber,
} from "@/app/actions/getPrivateSubscribers";

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

  console.log("subscribers", subscribers);
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
  }, [coachId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Table className="w-full">
      <TableCaption>Tracking Subscribers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Picture</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Starting Date</TableHead>
          <TableHead>Sessions</TableHead>
          <TableHead className="text-right">Actions</TableHead>
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
              <TableCell className="font-medium">
                <Image
                  src={subscriber.image ?? "/assets/no-pic.svg"}
                  alt="Profile Picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>
                {subscriber.firstName} {subscriber.lastName}
              </TableCell>
              <TableCell>
                {subscriber.privateSessionsAsMember?.[0]?.startSessionDate.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {subscriber.privateSessionsAsMember?.[0]?.sessionsNumber}
              </TableCell>
              <TableCell className="flex justify-end">
                <Button variant="blue">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Subscribers</TableCell>
          <TableCell className="text-right">{subscribers.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
