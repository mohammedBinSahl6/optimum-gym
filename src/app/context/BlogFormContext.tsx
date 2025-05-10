"use client";
import { createContext, useContext, useState } from "react";

interface BlogFormContextType {
  richTextValue: string;
  setRichTextValue: (value: string) => void;
  uploadedImage: string;
  setUploadedImage: (value: string) => void;
}

const BlogFormContext = createContext<BlogFormContextType | null>(null);

export const BlogFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [richTextValue, setRichTextValue] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  return (
    <BlogFormContext.Provider
      value={{
        richTextValue,
        setRichTextValue,
        uploadedImage,
        setUploadedImage,
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
