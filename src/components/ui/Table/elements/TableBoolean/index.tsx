"use client";
import { GridCellParams } from "@mui/x-data-grid";
import React from "react";

const TableBoolean = (params: GridCellParams) => {
    const val = params.value;
    return val ? "Yes" : "No";
};

export default TableBoolean;
