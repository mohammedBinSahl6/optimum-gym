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
import {
  getFilterdMembers,
  MembersBoard,
} from "@/app/actions/getFilterdMembers";

interface MembersTableProps {
  filter: string;
  searchTerm: string;
}

export default function MembersTable({
  filter,
  searchTerm,
}: MembersTableProps) {
  const [members, setMembers] = React.useState<MembersBoard>([]);
  useEffect(() => {
    const getMembers = async () => {
      const response = await getFilterdMembers(filter);
      if (response === "error") {
        return;
      }
      setMembers(response);
    };
    getMembers();
  }, [filter]);

  return (
    <Table className="w-full">
      <TableCaption>Tracking Members</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Picture</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Exp-date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members
          .filter((member) => "memberInfo" in member)
          .filter(
            (member) =>
              member.firstName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              member.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                <Image
                  src={member.image ?? "/assets/no-pic.svg"}
                  alt="Profile Picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>
                {member.firstName} {member.lastName}
              </TableCell>
              <TableCell>{member.memberInfo?.status}</TableCell>
              <TableCell className="text-right">
                {member.memberInfo?.endDate.toLocaleDateString()}
              </TableCell>
              <TableCell className="flex justify-end">
                <Button variant="blue">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Active Members</TableCell>
          <TableCell className="text-right">{members.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
