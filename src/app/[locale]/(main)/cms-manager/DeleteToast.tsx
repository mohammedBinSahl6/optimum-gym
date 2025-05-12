"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const DeleteToast = () => {
  const t = useTranslations("CmsPage");

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(t("deleteConfirmation"), {
          dismissible: false,
          position: "top-center",
          style: {
            display: "flex",
          },
          unstyled: true,
          className: "flex flex-col align-center justify-center p-8 gap-4",
          cancel: {
            label: t("cancel"),
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
            },
          },
          actionButtonStyle: {
            display: "inline-block",
            backgroundColor: "green",
            float: "right",
            color: "white",
            borderRadius: "8px",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
          },
          cancelButtonStyle: {
            display: "inline-block",
            float: "left",
            backgroundColor: "red",
            color: "white",
            borderRadius: "8px",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
          },
          action: {
            label: t("deleteConfirmationTitle"),
            onClick: (e) => {
              e.stopPropagation();
            },
          },
        })
      }
    >
      {t("showToast")}
    </Button>
  );
};

export default DeleteToast;
