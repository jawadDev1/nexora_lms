"use client";
import { GridCellParams } from "@mui/x-data-grid";
import React from "react";

const TableDate = (params: GridCellParams) => {
  const date = new Date(params?.value as string);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default TableDate;
