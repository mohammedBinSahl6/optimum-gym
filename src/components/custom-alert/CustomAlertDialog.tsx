"use client";
import React from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  onDelete: () => void;
  description?: string;
}

const CustomAlertDialog = ({ onDelete, description }: AlertDialogProps) => {
  const [openModal, setOpenModal] = React.useState(false);
  const t = useTranslations("CmsPage");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  return (
    <AlertDialog open={openModal}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="relative order-3 self-end"
          onClick={handleOpenModal}
        >
          <X size={32} data-id={description} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteConfirmationTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteConfirmationDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseModal}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction className="bg-primary-red" onClick={onDelete}>
            {t("deleteConfirmationTitle")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
