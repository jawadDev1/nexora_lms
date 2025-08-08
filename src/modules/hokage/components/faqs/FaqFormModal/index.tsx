"use client";
import React, { useState } from "react";
import ModalWrapper from "../../../../../components/modals/ModalWrapper";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import Link from "next/link";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import { signIn } from "next-auth/react";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import { CgClose } from "react-icons/cg";
import { IAuthModals } from "@/modules/auth/UserNav";
import { notifyError, notifySuccess } from "@/utils/toast";
import { faq_schema, FaqFormData } from "@/schemas/faq.schema";
import ToggleSwitch from "@/components/form/formFields/ToggleSwitch";
import { ADD_FAQ, UPDATE_FAQ } from "@/modules/hokage/actions/faq.actions";

const initialValues = {
    question: "",
    answer: "",
    active: false,
};

interface FaqFormModalProps {
    isOpen: boolean;
    handleCloseModal: () => void;
    id?: string;
    defaultValues?: FaqFormData;
}

const FaqFormModal = ({
    isOpen,
    handleCloseModal,
    id,
    defaultValues = initialValues,
}: FaqFormModalProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FaqFormData>({
        resolver: zodResolver(faq_schema),
        defaultValues,
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FaqFormData) => {
        setIsLoading(true);
        let result;
        if (id) {
            result = await UPDATE_FAQ({ ...data, id });
        } else {
            result = await ADD_FAQ(data);
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
                        placeholder="what is one piece"
                        label="Question"
                        name="question"
                        register={register}
                        error={errors?.question}
                        required
                    />
                </div>

                <div>
                    <InputWithLabel
                        type="text"
                        placeholder="who knows"
                        label="Answer"
                        name="answer"
                        error={errors?.answer}
                        register={register}
                        required
                    />
                </div>

                <ToggleSwitch
                    name="active"
                    control={control}
                    label="Active"
                    error={errors.active?.message}
                />

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

export default FaqFormModal;
