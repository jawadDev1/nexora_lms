"use client";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { CgTrash } from "react-icons/cg";

const CourseActions = () => {
  return (
    <div className="h-full w-full flex gap-x-3 justify-start items-center">
      <button className="bg-primary  rounded text-white">
        <AiOutlineEdit size={22} />
      </button>
      <button className="bg-tomato-red  rounded text-white">
        <CgTrash size={22} />
      </button>
    </div>
  );
};

export default CourseActions;
