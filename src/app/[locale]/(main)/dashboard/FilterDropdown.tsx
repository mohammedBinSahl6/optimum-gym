"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Filter, Check, Users, UserCheck, UserX, Clock } from "lucide-react";

const filterOptions = [
  {
    value: "All",
    label: "All Members",
    icon: Users,
    color: "text-primary-blue",
  },
  {
    value: "Active",
    label: "Active",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    value: "Inactive",
    label: "Inactive",
    icon: Clock,
    color: "text-yellow-600",
  },
  { value: "Expired", label: "Expired", icon: UserX, color: "text-red-600" },
];

interface FilterDropdownProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterDropdown = ({ filter, setFilter }: FilterDropdownProps) => {
  const t = useTranslations("DashboardPage");
  const currentFilter = filterOptions.find((option) => option.value === filter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-primary-light hover:bg-primary-light/20 text-primary-blue rounded-xl h-12 px-4 min-w-[140px] bg-transparent"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">{t("FilterMembersLabel")}:</span>
            <span className="font-medium">
              {currentFilter?.label || filter}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {filterOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setFilter(option.value)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <option.icon className={`w-4 h-4 ${option.color}`} />
            <span className="flex-1">{option.label}</span>
            {filter === option.value && (
              <Check className="w-4 h-4 text-primary-blue" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
