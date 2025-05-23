import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
import {
  getFilterdMembers,
  MembersBoard,
} from "@/app/actions/getFilterdMembers";
import Loader from "@/components/loader/Loader";
import { Link } from "@/i18n/routes";

interface MembersTableProps {
  filter: string;
  searchTerm: string;
}

export default function MembersTable({
  filter,
  searchTerm,
}: MembersTableProps) {
  const [members, setMembers] = React.useState<MembersBoard>([]);
  const [loading, setLoading] = React.useState(false);

  const t = useTranslations("DashboardPage");

  useEffect(() => {
    const getMembers = async () => {
      setLoading(true);
      const response = await getFilterdMembers(filter);
      if (response === "error") {
        return;
      }
      setMembers(response);
    };
    getMembers();
    setLoading(false);
  }, [filter]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Table className="w-full">
      <TableCaption>{t("MembersTableCaption")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>{t("MembersTableHeader.Picture")}</TableHead>
          <TableHead>{t("MembersTableHeader.Name")}</TableHead>
          <TableHead>{t("MembersTableHeader.Status")}</TableHead>
          <TableHead>{t("MembersTableHeader.ExpDate")}</TableHead>
          <TableHead className="text-right">
            {t("MembersTableHeader.Actions")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members
          .filter((member) => "MemberInfo" in member)
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
              <TableCell>
                {member.MemberInfo[member.MemberInfo.length - 1]?.status}
              </TableCell>
              <TableCell className="text-right">
                {member.MemberInfo[
                  member.MemberInfo.length - 1
                ]?.endDate.toDateString()}
              </TableCell>
              <TableCell className="flex justify-end">
                <Link href={`/edit-member/${member.id}`}>
                  <Button variant="blue">{t("EditMemberButton")}</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>{t("ActiveMembersLabel")}</TableCell>
          <TableCell className="text-right">{members.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
