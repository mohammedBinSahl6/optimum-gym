"use client";

import React from "react";

import MembersTable from "./MembersTable";
import FilterDropdown from "./FilterDropdown";
import { Input } from "@/components/ui/input";

const AdminPanel = () => {
  const [filter, setFilter] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div className="w-1/2 pt-10 flex flex-col gap-5 items-end">
      <div className="w-full flex gap-5 justify-between items-center">
        <Input
          placeholder="Search for a member"
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
