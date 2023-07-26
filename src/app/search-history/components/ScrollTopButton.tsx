"use client";

import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function ScrollTopButton() {
  const handleTopScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="fixed bottom-10 right-6 w-10 h-10 md:hidden shadow-xl rounded-full flex items-center justify-center bg-slate-800"
      onClick={handleTopScroll}
    >
      <AiOutlineArrowUp fill="white" className="w-6 h-6" />
    </button>
  );
}
