import { cancelMemberShip } from "@/app/actions/cancelMemberShip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { MemberInfo } from "@prisma/client";
import { PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import { toast } from "sonner";
import EditMembershipInfo from "./EditMembershipInfo";
import { useTranslations } from "next-intl";

interface MoreInfoMembershipModalProps {
  children: React.ReactNode;
  membership: MemberInfo;
}

const MoreInfoMembershipModal = ({
  children,
  membership,
}: MoreInfoMembershipModalProps) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const t = useTranslations("EditMemberPage");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? t("MembershipModalTitleEditMode")
              : t("MembershipModalTitle")}
          </DialogTitle>
          {isEdit ? (
            <EditMembershipInfo membership={membership} setIsEdit={setIsEdit} />
          ) : (
            <DialogDescription className="flex flex-col gap-5 pt-10">
              <span className="text-primary-blue">
                <b>{t("EditMembershipStartDate")}</b>:{" "}
                {membership.startDate.toLocaleDateString()}
              </span>
              <span className="text-primary-blue">
                <b>{t("EditMembershipEndDate")}</b>:{" "}
                {membership.endDate.toLocaleDateString()}
              </span>
              <span className="text-primary-blue capitalize">
                <b>{t("EditMembershipStatus")}</b>:{" "}
                {membership.status.toLocaleLowerCase()}
              </span>
              <span className="text-primary-blue">
                <b>{t("EditMembershipPlan")}</b>: {membership.plan}
              </span>
              <span className="text-primary-blue">
                <b>{t("EditMembershipInfo")}</b>: {membership.info}
              </span>
              <span className="text-primary-blue">
                <b>{t("EditMembershipWeight")}</b>: {membership.weight}
              </span>
              <span className="text-primary-blue">
                <b>{t("EditMembershipHeight")}</b>: {membership.height}
              </span>
              <span className="text-primary-blue">
                <b>{t("EditMembershipSubscriptionCost")}</b>:{" "}
                {membership.subscriptionCost}
              </span>
              <ConfirmCancelationPOpOver membershipId={membership.id} />
              <Button variant="blue" onClick={() => setIsEdit(!isEdit)}>
                {t("EditButton")}
              </Button>
            </DialogDescription>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MoreInfoMembershipModal;

const ConfirmCancelationPOpOver = ({
  membershipId,
}: {
  membershipId: string;
}) => {
  const [loading, setLoading] = React.useState(false);
  const t = useTranslations("EditMemberPage");

  const handleCancelMembership = async () => {
    setLoading(true);
    const response = await cancelMemberShip(membershipId);
    if (response === "success") {
      toast.success(t("CancelMemberShipSuccessMessage"));
    } else {
      toast.error(t("CancelMemberShipErrorMessage"));
    }
    setLoading(false);
  };
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button>{t("CancelMemberShip")}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex flex-col gap-5">
        {t("CancelMemberShipConfirmation")}
        <Button
          variant="outline"
          onClick={handleCancelMembership}
          loading={loading}
          disabled={loading}
        >
          {t("ConfirmButton")}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
