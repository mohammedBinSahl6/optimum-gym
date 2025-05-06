import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

const DatePickerForm = ({
  field,
  fromDate,
  toDate,
  modal = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  fromDate: Date;
  toDate: Date;
  modal?: boolean;
}) => {
  return (
    <Popover modal={modal}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "max-w-[340px] w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
          toDate={toDate}
          fromDate={fromDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerForm;
