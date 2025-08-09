"use client";
import DeleteButton from "@/components/ui/buttons/DeleteButton";
import { DELETE_USER } from "@/modules/hokage/actions";
import { notifyError, notifySuccess } from "@/utils/toast";
import { GridCellParams } from "@mui/x-data-grid";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";

const UsersActions = (params: GridCellParams) => {
    const email = params.row?.email;

    const handleDelete = async () => {
        const id = params.row?.id;

        const result = await DELETE_USER({ userId: id });

        if (!result.success) {
            notifyError(result.message);
            return;
        }

        notifySuccess(result.message);
    };

    return (
        <div className="h-full w-full flex gap-x-4 justify-start items-center">
            <a href={`mailto:${email}`}>
                <AiOutlineMail size={26} />
            </a>

            <DeleteButton onClick={handleDelete} />
        </div>
    );
};

export default UsersActions;
