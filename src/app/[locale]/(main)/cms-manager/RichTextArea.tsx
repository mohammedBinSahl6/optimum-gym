import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextArea = ({ onChange, value }: RichTextAreaProps) => {
  return (
    <ReactQuill
      className="h-44 z-0"
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

export default RichTextArea;
