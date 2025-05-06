import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { updateMember } from "@/app/actions/updateMember";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formSchema from "@/lib/zod/editMember";
import DatePickerForm from "@/components/date-picker/DatePicker";
import { useRouter } from "@/routes";
import { getFormItems } from "@/lib/forms/editMember";

interface EditMemberFormProps {
  userProfile: User;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditMemberForm = ({ userProfile, setIsEdit }: EditMemberFormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: userProfile.address ?? "",
      dateOfBirth: userProfile.dateOfBirth ?? new Date(),
      email: userProfile.email ?? "",
      firstName: userProfile.firstName ?? "",
      fullName: userProfile.fullName ?? "",
      info: userProfile.info ?? "",
      lastName: userProfile.lastName ?? "",
      nationality: userProfile.nationality ?? "",
      phoneNumber: userProfile.phoneNumber ?? "",
      username: userProfile.username ?? "",
      gender: userProfile.gender ?? "MALE",
    },
  });

  const router = useRouter();

  const t = useTranslations("EditMemberPage");
  const formItems = getFormItems(t);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await updateMember(userProfile.id, values);
    if (response === "error") {
      toast.error(t("UpdatememberErrorMessage"));
    } else {
      toast(t("UpdatememberSuccessMessage"));
      setIsEdit(false);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center gap-5 border rounded-xl p-10 w-full md:w-3/4 animate-flipY">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-7"
        >
          {formItems.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>{item.label}</FormLabel>
                  {item.type === "date" ? (
                    <DatePickerForm
                      field={field}
                      fromDate={new Date(0)}
                      toDate={new Date()}
                    />
                  ) : (
                    <FormControl>
                      <Input
                        placeholder={item.placeholder}
                        {...field}
                        type={item.type}
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
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("EditMemberGender")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="max-w-[340px] w-full">
                      <SelectValue
                        placeholder={t("EditMemberGenderPlaceholder")}
                        defaultValue={userProfile.gender}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">
                      {t("EditMemberGenderMale")}
                    </SelectItem>
                    <SelectItem value="FEMALE">
                      {t("EditMemberGenderFemale")}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="blue"
            type="submit"
            disabled={loading}
            loading={loading}
          >
            {t("UpdateButton")}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsEdit(false)}
            disabled={loading}
          >
            {t("CancelButton")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditMemberForm;
