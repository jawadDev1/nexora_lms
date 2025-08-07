"use client";
import React from "react";

const TableDate = (params: any) => {
  const date = new Date(params?.value);
  //   const date = new Date(val);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default TableDate;
