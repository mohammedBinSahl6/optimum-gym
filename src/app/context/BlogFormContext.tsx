"use client";
import { createContext, RefObject, useContext, useRef, useState } from "react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { toast } from "sonner";

import { useTranslations } from "next-intl";

type UploadProperties = {
  fullName: string;
  user: { id: string };
  userBlogCount: number;
};
interface BlogFormContextType {
  richTextValue: string;
  setRichTextValue: (value: string) => void;
  uploadedImage: string;
  fileRef: RefObject<HTMLInputElement>;
  handleUpload: ({
    fullName,
    user,
    userBlogCount,
  }: UploadProperties) => Promise<void>;
  setUploadedImage: (value: string) => void;
  drawerVariant: "create" | "edit";
  setDrawerVariant: (value: "create" | "edit") => void;
}

const BlogFormContext = createContext<BlogFormContextType | null>(null);

export const BlogFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [richTextValue, setRichTextValue] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [drawerVariant, setDrawerVariant] = useState<"create" | "edit">(
    "create"
  );
  const t = useTranslations("CmsPage");

  const abortCtrl = new AbortController();

  const fetchAuth = async () => {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  const handleUpload = async ({
    fullName,
    user,
    userBlogCount,
  }: UploadProperties) => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.warning(t("SelectFile"));
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
        fileName: `${fullName}-${user.id}-b${userBlogCount}`,
        folder: "optimum-gym/blogs",
        expire: auth.expire,
        token: auth.token,
        signature: auth.signature,
        publicKey: auth.publicKey,
        abortSignal: abortCtrl.signal,
      });

      setUploadedImage(url);
    } catch (err) {
      if (err instanceof ImageKitAbortError) {
        toast.error(t("UploadError.Aborted", { message: err.message }));
      } else if (err instanceof ImageKitInvalidRequestError) {
        toast.error(t("UploadError.Invalid", { message: err.message }));
      } else if (err instanceof ImageKitUploadNetworkError) {
        toast.error(t("UploadError.Network", { message: err.message }));
      } else if (err instanceof ImageKitServerError) {
        toast.error(t("UploadError.Server", { message: err.message }));
      } else {
        toast.error(t("UploadError.Unknown", { error: String(err) }));
      }
    }
  };

  return (
    <BlogFormContext.Provider
      value={{
        richTextValue,
        setRichTextValue,
        uploadedImage,
        setUploadedImage,
        fileRef,
        handleUpload,
        drawerVariant,
        setDrawerVariant,
      }}
    >
      {children}
    </BlogFormContext.Provider>
  );
};

export const useBlogForm = () => {
  const context = useContext(BlogFormContext);
  if (!context) {
    throw new Error("useBlogForm must be used within BlogFormProvider");
  }
  return context;
};
