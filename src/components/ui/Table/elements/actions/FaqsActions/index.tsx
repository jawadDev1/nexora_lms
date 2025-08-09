"use client";
import Button from "@/components/ui/buttons/Button";
import DeleteButton from "@/components/ui/buttons/DeleteButton";
import { DELETE_FAQ } from "@/modules/hokage/actions/faq.actions";
import FaqFormModal from "@/modules/hokage/components/faqs/FaqFormModal";
import { notifyError, notifySuccess } from "@/utils/toast";
import { GridCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";

const FaqsActions = (params: GridCellParams) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    const handleDelete = async () => {
        const id = params.row?.id;

        const result = await DELETE_FAQ({ id });

        if (!result.success) {
            notifyError(result.message);
            return;
        }

        notifySuccess(result.message);
    };

    const id = params.row?.id;
    const { question, answer, active } = params.row;

    return (
        <>
            <div className="h-full w-full flex gap-x-4 justify-start items-center">
                <Button
                    onClick={toggleModal}
                    className={
                        "bg-green-500 hover:bg-green-800 p-1 w-fit rounded-md"
                    }
                >
                    <BiEdit size={20} color="white" />
                </Button>
                <DeleteButton onClick={handleDelete} />
            </div>

            <FaqFormModal
                isOpen={isOpen}
                handleCloseModal={toggleModal}
                id={id}
                defaultValues={{ question, answer, active }}
            />
        </>
    );
};

export default FaqsActions;
