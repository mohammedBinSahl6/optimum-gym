/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getFilterdMembers } from "@/app/actions/getFilterdMembers";
import { FormControl } from "@/components/ui/form";

export function MembersCombobox({
  onChange,
  val,
  form,
}: {
  onChange: (value: any) => void;
  val: string;
  form: UseFormReturn<
    {
      member?: string;
      sessions?: string;
      startDate?: Date;
    },
    any,
    undefined
  >;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(val);
  const [members, setMembers] = React.useState<
    { value: string; label: string }[]
  >([]);

  React.useEffect(() => {
    const getMembers = async () => {
      const response = await getFilterdMembers("All");
      if (response === "error") {
        return;
      }
      const membersRes = response.map((member) => ({
        value: member.id,
        label: `${member.firstName} ${member.lastName}`,
      }));
      setMembers(membersRes);
    };
    getMembers();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className="max-w-[340px] w-full justify-between"
          >
            {value
              ? members.find((member) => member.value === value)?.label
              : "Select member..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <Command>
          <CommandInput placeholder="Search member..." className="h-9" />
          <CommandList>
            <CommandEmpty>No members found.</CommandEmpty>
            <CommandGroup>
              {members.map((member) => (
                <CommandItem
                  className="hover:cursor-pointer"
                  key={member.value}
                  value={member.value}
                  onSelect={(current) => {
                    if (current === value) {
                      setValue("");
                      onChange("");
                      form.setValue("member", "");
                    } else {
                      setValue(current);
                      onChange(current);
                      form.setValue("member", member.value);
                    }
                    setOpen(false);
                  }}
                >
                  {member.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === member.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
