import Loader from "@/components/loader/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader size="lg" />
    </div>
  );
};

export default Loading;
