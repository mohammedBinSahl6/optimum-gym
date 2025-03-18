"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

export default function LanguageSelector() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const currentPath = usePathname();

  const removedFirstPath = currentPath.split("/").slice(2).join("/");

  const onSelectChange = (value: string) => {
    startTransition(() => {
      router.replace(`/${value}/${removedFirstPath}`);
    });
  };
  return (
    <Select
      onValueChange={onSelectChange}
      disabled={isPending}
      defaultValue={localActive}
    >
      <SelectTrigger className="w-fit text-primary-blue" disabled={isPending}>
        <SelectValue
          placeholder="Select a Language"
          defaultValue={localActive}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ar">Arabic</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
