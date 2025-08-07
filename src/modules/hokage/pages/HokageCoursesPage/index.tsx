import Table from "@/components/ui/Table";
import React from "react";
import { notifyError } from "@/utils/toast";
import { GridColDef } from "@mui/x-data-grid";
import TableDate from "@/components/ui/Table/elements/TableDate";
import TableSr from "@/components/ui/Table/elements/TableSr";
import CourseActions from "@/components/ui/Table/elements/actions/CourseActions";
import { getHokageCourses } from "../../services";

const HokageCouresPage = async () => {
  const result = await getHokageCourses({ page: 1, pageSize: 15 });

  if (!result?.success) {
    notifyError(result?.message);
  }

  const columns: GridColDef[] = [
    {
      field: "",
      headerName: "Sr#",
      flex: 0.2,
      renderCell: TableSr,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.4,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 0.2,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.2,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.2,
      renderCell: TableDate,
    },
    {
      field: "id",
      headerName: "Actions",
      flex: 0.3,
      renderCell: CourseActions,
    },
  ];

  return (
    <div className="bg-card py-6 px-6  rounded-xl">
      <Table rows={result?.data ?? []} cols={columns} />
    </div>
  );
};

export default HokageCouresPage;
