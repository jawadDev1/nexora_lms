import React from "react";
import { notifyError } from "@/utils/toast";
import { GridColDef } from "@mui/x-data-grid";
import TableSr from "@/components/ui/Table/elements/TableSr";
import TableDate from "@/components/ui/Table/elements/TableDate";
import Table from "@/components/ui/Table";
import { getHokageOrders } from "../../services";

const HokageInvoicesPage = async () => {
  const result = await getHokageOrders("");

  if (!result.success) {
    notifyError(result.message);
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Sr#",
      flex: 0.1,
      renderCell: TableSr,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.2,
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 0.2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.4,
    },
    {
      field: "created_at",
      headerName: "Placed on",
      flex: 0.2,
      renderCell: TableDate,
    },
    
  ];

  return (
    <div className="bg-card rounded-xl py-6 px-5">
      <Table cols={columns} rows={result?.data ?? []} />
    </div>
  );
};

export default HokageInvoicesPage;
