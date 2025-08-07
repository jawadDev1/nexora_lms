'use client';
import React from "react";

const TableSr = (params: any) => {
  return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
};

export default TableSr;
