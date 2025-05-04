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

interface MoreInfoMembershipModalProps {
  children: React.ReactNode;
  membership: MemberInfo;
}

const MoreInfoMembershipModal = ({
  children,
  membership,
}: MoreInfoMembershipModalProps) => {
  const [isEdit, setIsEdit] = React.useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Membership" : "More Info about Membership"}</DialogTitle>
          {isEdit ? (
            <EditMembershipInfo membership={membership} setIsEdit={setIsEdit} />
          ) : (
            <DialogDescription className="flex flex-col gap-5 pt-10">
              <span className="text-primary-blue">
                <b>Start Date</b>: {membership.startDate.toLocaleDateString()}
              </span>
              <span className="text-primary-blue">
                <b>End Date</b>: {membership.endDate.toLocaleDateString()}
              </span>
              <span className="text-primary-blue capitalize">
                <b>Status</b>: {membership.status.toLocaleLowerCase()}
              </span>
              <span className="text-primary-blue">
                <b>Plan</b>: {membership.plan}
              </span>
              <span className="text-primary-blue">
                <b>Additional info</b>: {membership.info}
              </span>
              <span className="text-primary-blue">
                <b>Weight</b>: {membership.weight}
              </span>
              <span className="text-primary-blue">
                <b>Height</b>: {membership.height}
              </span>
              <span className="text-primary-blue">
                <b>Paid</b>: {membership.subscriptionCost}
              </span>
              <ConfirmCancelationPOpOver membershipId={membership.id} />
              <Button variant="blue" onClick={() => setIsEdit(!isEdit)}>
                Edit
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

  const handleCancelMembership = async () => {
    setLoading(true);
    const response = await cancelMemberShip(membershipId);
    if (response === "success") {
      toast.success("Membership cancelled successfully");
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button>Cancel Membership</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex flex-col gap-5">
        Are you sure you want to cancel this membership?
        <Button
          variant="outline"
          onClick={handleCancelMembership}
          loading={loading}
          disabled={loading}
        >
          Confirm
        </Button>
      </PopoverContent>
    </Popover>
  );
};
