"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, createTheme, ThemeProvider } from "@mui/material";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

// Create a custom theme using your color palette
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1E1E1E",
      paper: "#242424",
    },
    primary: {
      main: "#FFDE00",
    },
    text: {
      primary: "#ffffff",
      secondary: "#797979",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#242424",
          border: "1px solid #797979",
          "& .MuiDataGrid-cell": {
            borderColor: "#1D1D1F",
            color: "#ffffff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1D1D1F",
            borderColor: "#797979",
          },
          "& .MuiDataGrid-columnHeader": {
            color: "#ffffff",
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
            backgroundColor: "#1D1D1F",
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
        },
      },
    },
  },
});

const Table = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          height: 400,
          width: "100%",
          backgroundColor: "#1E1E1E",
          padding: 2,
          borderRadius: 1,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </ThemeProvider>
  );
};

export default Table;
