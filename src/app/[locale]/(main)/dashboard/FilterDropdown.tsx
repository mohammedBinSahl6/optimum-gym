"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const filterOptions = ["All", "Active", "Inactive", "Expired"];

interface FilterDropdownProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterDropdown = ({ filter, setFilter }: FilterDropdownProps) => {
  const t = useTranslations("DashboardPage");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          {t("FilterMembersLabel")}: {filter}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {filterOptions.map((option) => (
          <DropdownMenuItem key={option} onClick={() => setFilter(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
