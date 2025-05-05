import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextArea = (value: string, setValue: () => void) => {
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
};

export default RichTextArea;
