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
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
      }}
    />
  );
};

export default RichTextArea;
