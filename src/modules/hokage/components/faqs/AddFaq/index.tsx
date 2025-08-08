"use client";
import Button from "@/components/ui/buttons/Button";
import React, { useState } from "react";
import FaqFormModal from "../FaqFormModal";

const AddFaq = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            <div className="flex justify-end">
                <Button onClick={toggleModal} className="max-w-[100px] ml-auto">
                    Add Faq
                </Button>
            </div>

            <FaqFormModal isOpen={isModalOpen} handleCloseModal={toggleModal} />
        </>
    );
};

export default AddFaq;
