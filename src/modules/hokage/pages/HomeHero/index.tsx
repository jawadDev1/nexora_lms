"use client";
import DragDropImageInput from "@/components/form/formFields/DragDropImageInput";
import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import Button from "@/components/ui/buttons/Button";
import { hero_schem, HeroFormData } from "@/schemas/hero.schema";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "@/utils/toast";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import { IHomeHeroBody } from "../../types/home.types";
import { UPDATE_HOME_HERO } from "../../actions";

interface HomeHeroPageProps {
    data: IHomeHeroBody;
}

const HomeHeroPage = ({ data }: HomeHeroPageProps) => {
    const {
        register,
        setValue,
        setError,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<HeroFormData>({
        resolver: zodResolver(hero_schem),
        defaultValues: data,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);

    const handleImageChange = async (file: File) => {
        if (!file) return;
        const img = await uploadImageToAppwrite(file);
        if (!img) {
            setError("image", { message: "failed to upload image" });
            return;
        }

        setValue("image", img);
    };

    const onSubmit = async (data: HeroFormData) => {
        setIsLoading(true);
        const result = await UPDATE_HOME_HERO(data);

        setIsLoading(false);
        if (!result.success) {
            notifyError(result.message);
            return;
        }

        notifySuccess(result.message);
    };

    return (
        <div className="bg-card rounded-xl py-5 px-5">
            <form
                className=" flex flex-col gap-y-5 max-w-[800px] mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <InputWithLabel
                        name="title"
                        label="Title"
                        placeholder="Kaizok ni ore wa naru"
                        register={register}
                        error={errors.title}
                        required
                    />
                </div>
                <div>
                    <InputWithLabel
                        name="subtitle"
                        label="Subtitle"
                        placeholder="Kaizok ni ore wa naru"
                        register={register}
                        error={errors.subtitle}
                        required
                    />
                </div>

                <div>
                    <DragDropImageInput
                        key={watch("image")}
                        name="image"
                        defaultPreview={watch("image")}
                        error={errors.image}
                        handleImageChange={handleImageChange}
                        isLoading={isImageLoading}
                    />
                </div>

                <div>
                    <SpinnerButton isLoading={isLoading}>Update</SpinnerButton>
                </div>
            </form>
        </div>
    );
};

export default HomeHeroPage;
