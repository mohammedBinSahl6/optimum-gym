"use client";

import type React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import type { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Save, X } from "lucide-react";
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
import { useRouter } from "@/i18n/routes";
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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-light/30 p-8 animate-flipY">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary-blue mb-2">
          Edit Profile
        </h3>
        <p className="text-primary-blue/70">Update your personal information</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formItems.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-primary-blue font-medium">
                      {item.label}
                    </FormLabel>
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
                          value={field.value as string}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="border-primary-light/50 focus:border-primary-blue focus:ring-primary-blue/20 rounded-xl"
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
                <FormItem className="space-y-2">
                  <FormLabel className="text-primary-blue font-medium">
                    {t("EditMemberGender")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary-light/50 focus:border-primary-blue focus:ring-primary-blue/20 rounded-xl">
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
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-primary-light/30">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-primary-blue to-primary-light-blue hover:from-primary-blue/90 hover:to-primary-light-blue/90 text-white rounded-xl py-3 font-medium transition-all duration-200 hover:shadow-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {t("UpdateButton")}
                </div>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEdit(false)}
              disabled={loading}
              className="flex-1 border-primary-light hover:bg-primary-light/20 text-primary-blue rounded-xl py-3 font-medium transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <X className="w-4 h-4" />
                {t("CancelButton")}
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditMemberForm;
