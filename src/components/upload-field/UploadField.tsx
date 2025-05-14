"use client";

import { useBlogForm } from "@/app/context/BlogFormContext";
import { Input } from "../ui/input";

const UploadField = () => {
  const { fileRef } = useBlogForm();

  return (
    <div className="flex relative mt-9 justify-evenly gap-2">
      <Input type="file" ref={fileRef} />
    </div>
  );
};

export default UploadField;
