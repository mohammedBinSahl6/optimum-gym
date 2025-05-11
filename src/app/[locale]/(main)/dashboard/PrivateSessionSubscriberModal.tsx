import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePickerForm from "@/components/date-picker/DatePicker";
import { getFormItems } from "@/lib/forms/privateSession";
import formSchema from "@/lib/zod/privateSession";
import { DATE_FOR_2100_YEAR } from "../new-users/MembershipDrawer";
import { PrivateSession } from "@prisma/client";
import { updatePrivateSession } from "@/app/actions/updatePrivateSession";

const PrivateSessionSubscriberModal = ({
  currentSession,
}: {
  subscriberId: string;
  currentSession: PrivateSession;
}) => {
  const [loading, setLoading] = React.useState(false);

  const t = useTranslations("DashboardPage");
  const formItems = getFormItems(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      member: currentSession.memberId,
      sessions: String(currentSession.sessionsNumber),
      startDate: currentSession.startSessionDate,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await updatePrivateSession(currentSession.id, values);
      if (response === "error") {
        toast.error(t("UpdateErrorMessage"));
        setLoading(false);
        return;
      }
      toast.success(t("UpdateSessionSuccessMessage"));
      setLoading(false);
      location.reload();
    } catch (error) {
      console.log(error);
      toast.error(t("UpdateErrorMessage"));
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blue">{t("UpdateButton")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("UpdatePrivateSessionFormTitle")}</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3 max-w-sm md:max-w-full p-10"
            >
              {formItems.map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 items-start">
                      <FormLabel>{item.label}</FormLabel>
                      {item.type === "date" ? (
                        <DatePickerForm
                          field={field}
                          fromDate={new Date()}
                          toDate={new Date(DATE_FOR_2100_YEAR)}
                        />
                      ) : (
                        <FormControl>
                          <Input
                            placeholder={item.placeholder}
                            {...field}
                            type={item.type as "text"}
                            value={field.value as string} // Ensure value is a string
                            onChange={(e) => field.onChange(e.target.value)} // Handle change correctly
                            className="max-w-[340px] w-full"
                          />
                        </FormControl>
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button type="submit" disabled={loading} loading={loading}>
                {t("UpdatePrivateSessionFormButton")}
              </Button>
            </form>
          </Form>
        </DialogHeader>
        <div className="flex flex-col gap-5"></div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateSessionSubscriberModal;
