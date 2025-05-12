"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { useBlogForm } from "@/app/context/BlogFormContext";

interface UploadFieldProps {
  userId: string;
  username: string;
  userBlogCount: number;
  onChange: (url: string) => void;
}

const UploadField = ({
  userId,
  username,
  userBlogCount,
  onChange,
}: UploadFieldProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { setUploadedImage } = useBlogForm();
  const abortCtrl = new AbortController();
  const t = useTranslations("CmsPage");

  const fetchAuth = async () => {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.warning(t("selectFile"));
      return;
    }

    let auth;
    try {
      auth = await fetchAuth();
    } catch (e) {
      console.error("Auth error:", e);
      return;
    }

    try {
      const { url } = await upload({
        file,
        fileName: `${username}-${userId}-b${userBlogCount}`,
        folder: "optimum-gym/blogs",
        expire: auth.expire,
        token: auth.token,
        signature: auth.signature,
        publicKey: auth.publicKey,
        abortSignal: abortCtrl.signal,
      });

      setUploadedImage(url);
      onChange(url);
    } catch (err) {
      if (err instanceof ImageKitAbortError) {
        toast.error(t("uploadError.aborted", { message: err.message }));
      } else if (err instanceof ImageKitInvalidRequestError) {
        toast.error(t("uploadError.invalid", { message: err.message }));
      } else if (err instanceof ImageKitUploadNetworkError) {
        toast.error(t("uploadError.network", { message: err.message }));
      } else if (err instanceof ImageKitServerError) {
        toast.error(t("uploadError.server", { message: err.message }));
      } else {
        toast.error(t("uploadError.unknown", { error: String(err) }));
      }
    }
  };

  return (
    <div className="flex relative mt-9 justify-evenly gap-2">
      <Input type="file" ref={fileRef} />
      <Button size="sm" onClick={handleUpload} type="button">
        {t("upload")}
      </Button>
    </div>
  );
};

export default UploadField;
