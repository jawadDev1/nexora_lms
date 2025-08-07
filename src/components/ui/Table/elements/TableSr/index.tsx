'use client';
import { GridCellParams } from "@mui/x-data-grid";
import React from "react";

const TableSr = (params: GridCellParams) => {
  return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
};

export default TableSr;
