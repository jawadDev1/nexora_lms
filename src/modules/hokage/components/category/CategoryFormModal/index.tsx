"use client";
import React, { useState } from "react";
import ModalWrapper from "../../../../../components/modals/ModalWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import { CgClose } from "react-icons/cg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { category_schema, CategoryFormData } from "@/schemas/category.schema";
import { ADD_CATEGORY, UPDATE_CATEGORY } from "@/modules/hokage/actions";

const initialValues = {
    title: "",
};

interface CategoryFormModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
    id?: string;
    defaultValues?: CategoryFormData;
}

const CategoryFormModal = ({
    isOpen,
    handleCloseModal,
    id,
    defaultValues = initialValues,
}: CategoryFormModalProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(category_schema),
        defaultValues,
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: CategoryFormData) => {
        setIsLoading(true);
        let result;
        if (id) {
            result = await UPDATE_CATEGORY({ ...data, id });
        } else {
            result = await ADD_CATEGORY(data);
        }

        setIsLoading(false);
        if (!result.success) {
            notifyError(result.message);
            return;
        }

        notifySuccess(result.message);
        handleCloseModal();
    };

    return (
        <ModalWrapper isOpen={isOpen} className="py-5  relative md:py-8 px-5 ">
            <span
                onClick={handleCloseModal}
                className="absolute cursor-pointer right-7 top-8"
            >
                <CgClose size={27} />
            </span>
            <SectionTitle className="mb-8 text-center">
                {id ? "Update" : "Add"}
            </SectionTitle>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[90%] mx-auto   space-y-5 lg:space-y-6 "
            >
                <div>
                    <InputWithLabel
                        type="text"
                        placeholder="Web Development"
                        label="Title"
                        name="title"
                        register={register}
                        error={errors?.title}
                        required
                    />
                </div>

                <div className="flex justify-center w-full">
                    <SpinnerButton
                        className="max-w-[300px] mx-auto"
                        isLoading={isLoading}
                    >
                        {id ? "Update" : "Add"}
                    </SpinnerButton>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default CategoryFormModal;
