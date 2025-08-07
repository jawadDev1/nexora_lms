import React from "react";
import { getHokageUsers } from "../../services/users.services";
import { notifyError } from "@/utils/toast";
import { GridColDef } from "@mui/x-data-grid";
import TableSr from "@/components/ui/Table/elements/TableSr";
import TableDate from "@/components/ui/Table/elements/TableDate";
import UsersActions from "@/components/ui/Table/elements/actions/UsersActions";
import Table from "@/components/ui/Table";

const HokageUsersPage = async () => {
  const result = await getHokageUsers("");

  if (!result.success) {
    notifyError(result.message);
  }

  const columns: GridColDef[] = [
    {
      field: "",
      headerName: "Sr#",
      flex: 0.1,
      renderCell: TableSr,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.4,
    },
    {
      field: "enrollments",
      headerName: "Courses",
      flex: 0.2,
    },
    {
      field: "created_at",
      headerName: "Joined on",
      flex: 0.2,
      renderCell: TableDate,
    },
    {
      field: "id",
      headerName: "Actions",
      flex: 0.3,
      renderCell: UsersActions,
    },
  ];

  return (
    <div className="bg-card rounded-xl py-6 px-5">
      <Table cols={columns} rows={result?.data ?? []} />
    </div>
  );
};

export default HokageUsersPage;
