"use client";
import DeleteButton from "@/components/ui/buttons/DeleteButton";
import EditButton from "@/components/ui/buttons/EditButton";
import { DELETE_COURSE } from "@/modules/hokage/actions";
import { notifyError, notifySuccess } from "@/utils/toast";
import { GridCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";

const CourseActions = (params: GridCellParams) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true);
    const id = params.row?.id;
    const result = await DELETE_COURSE({courseId: id})

    setIsLoading(false);
    if(!result?.success) {
      notifyError(result.message)
      return
    }

    notifySuccess(result.message)
  }


  return (
    <div className="h-full w-full flex gap-x-3 justify-start items-center">
    <EditButton link={`/hokage/course/update/${params.row?.id}`} /> 
    <DeleteButton onClick={handleDelete} isLoading={isLoading} /> 
    </div>
  );
};

export default CourseActions;
