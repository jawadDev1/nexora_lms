"use client";
import Button from "@/components/ui/buttons/Button";
import React, { useState } from "react";
import CategoryFormModal from "../CategoryFormModal";

const AddCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            <div className="flex justify-end">
                <Button onClick={toggleModal} className="max-w-fit ml-auto">
                    Add Category
                </Button>
            </div>

            <CategoryFormModal
                isOpen={isModalOpen}
                handleCloseModal={toggleModal}
            />
        </>
    );
};

export default AddCategory;
