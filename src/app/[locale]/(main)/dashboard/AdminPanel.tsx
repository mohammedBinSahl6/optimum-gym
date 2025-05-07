"use client";

import React from "react";
import { useTranslations } from "next-intl";

import MembersTable from "./MembersTable";
import FilterDropdown from "./FilterDropdown";
import { Input } from "@/components/ui/input";

const AdminPanel = () => {
  const [filter, setFilter] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");
  const t = useTranslations("DashboardPage");
  return (
    <div className="w-1/2 pt-10 flex flex-col gap-5 items-end">
      <div className="w-full flex gap-5 justify-between items-center">
        <Input
          placeholder={t('SearchPlaceholder')}
          type="text"
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterDropdown filter={filter} setFilter={setFilter} />
      </div>
      <MembersTable filter={filter} searchTerm={searchTerm} />
    </div>
  );
};

export default AdminPanel;
