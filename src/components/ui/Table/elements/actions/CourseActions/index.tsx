"use client";
import DeleteButton from "@/components/ui/buttons/DeleteButton";
import EditButton from "@/components/ui/buttons/EditButton";
import { DELETE_COURSE } from "@/modules/hokage/actions/course.actions";
import { notifyError, notifySuccess } from "@/utils/toast";
import { GridCellParams } from "@mui/x-data-grid";
import { Eye } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const CourseActions = (params: GridCellParams) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const id = params.row?.id;
    const result = await DELETE_COURSE({ courseId: id });

    setIsLoading(false);
    if (!result?.success) {
      notifyError(result.message);
      return;
    }

    notifySuccess(result.message);
  };

  return (
    <div className="h-full w-full flex gap-x-3 justify-start items-center">
      <Link
        href={`/course/admin-courses/${params.row?.slug}`}
        className={"bg-green-600  p-1 rounded-md"}
      >
        <Eye size={20} />
      </Link>
      <EditButton link={`/hokage/course/update/${params.row?.id}`} />
      <DeleteButton onClick={handleDelete} isLoading={isLoading} />
    </div>
  );
};

export default CourseActions;
