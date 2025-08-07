"use client";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import TableSkeleton from "./TableSkelaton";

const dataGridStyles = {
  backgroundColor: "transparent",
  border: "0px solid #797979",
  "& .MuiDataGrid-cell": {
    borderColor: "#1D1D1F",
    color: "#ffffff",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#000",
    borderColor: "#797979",
  },
  "& .MuiDataGrid-columnHeader": {
    color: "#ffffff",
    backgroundColor: "#1E1E1E",
    border: 0,
    "&:hover": {
      backgroundColor: "#1E1E1E",
    },
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "#242424",
    "&:hover": {
      backgroundColor: "#1D1D1F",
    },
    "&.Mui-selected": {
      backgroundColor: "#1D1D1F",
      "&:hover": {
        backgroundColor: "#1E1E1E",
      },
    },
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #797979",
  },
  "& .MuiTablePagination-root": {
    color: "#ffffff",
  },
  "& .MuiIconButton-root": {
    color: "#797979",
    "&:hover": {
      backgroundColor: "#1E1E1E",
    },
  },
  "& .MuiCheckbox-root": {
    color: "#797979",
    "&.Mui-checked": {
      color: "#FFDE00",
    },
  },
  "& .MuiDataGrid-sortIcon": {
    color: "#FFDE00",
  },
  "& .MuiDataGrid-menuIconButton": {
    color: "#797979",
  },
  "& .MuiDataGrid-filler": {
    border: 0,
  },
};

interface TableProps {
  cols: GridColDef[];
  rows: any[];
  pageSize?: number;
}

const Table = ({ rows, cols, pageSize = 15 }: TableProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <TableSkeleton rows={8} />;
  }

  return (
    rows &&
    rows.length > 0 &&
    isClient && (
      <Box
        sx={{
          minHeight: 400,
          maxHeight: "85vh",
          width: "100%",
          backgroundColor: "",
          padding: 2,
          borderRadius: 1,
        }}
      >
        <DataGrid
          rows={rows}
          columns={cols}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize,
              },
            },
          }}
          pageSizeOptions={[pageSize]}
          // checkboxSelection
          disableRowSelectionOnClick
          sx={{
            ...dataGridStyles,
          }}
        />
      </Box>
    )
  );
};

export default Table;
