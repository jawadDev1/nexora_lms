"use client";
import DragDropImageInput from "@/components/form/formFields/DragDropImageInput";
import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import SelectWithLabel from "@/components/form/formFields/SelectWithLabel";
import TextareaWithLabel from "@/components/form/formFields/TextareaWithLabel";
import Button from "@/components/ui/buttons/Button";
import { LEVEL_OPTIONS } from "@/constants/form";
import {
  course_info_schema,
  CourseInfoFormData,
} from "@/schemas/course.schema";
import { useCourseForm } from "@/stores/course-form-store";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CourseInfoSection = () => {
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CourseInfoFormData>({
    resolver: zodResolver(course_info_schema),
  });

  const { handleNextStep, handleGetSectionData } = useCourseForm();

  const [isThumbnailLoading, setIsThumbnailLoading] = useState(false);

  const handleThumbnailChange = async (file: File) => {
    setIsThumbnailLoading(true);

    const img = await uploadImageToAppwrite(file);
    setIsThumbnailLoading(false);
    if (!img) {
      setError("thumbnail", { message: "Failed to upload thumbnail" });
      return;
    }
    setValue("thumbnail", img);
  };

  const onSubmit = (data: CourseInfoFormData) => {
    handleNextStep("course_info", data);
  };

  useEffect(() => {
    const data = handleGetSectionData("course_info");
    if (data) {
      reset(data as CourseInfoFormData);
    }
  }, []);

  return (
    <div className="bg-card rounded-xl py-4 px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[800px] mx-auto grid grid-cols-2 gap-5"
      >
        <div className="col-span-full">
          <InputWithLabel
            label="Title"
            name="title"
            placeholder="Nest.js crash course"
            register={register}
            error={errors?.title}
            required
          />
        </div>
        <div className="col-span-full">
          <TextareaWithLabel
            label="Description"
            name="description"
            placeholder="Enter description of the course"
            register={register}
            error={errors?.description}
            required
          />
        </div>
        <div>
          <InputWithLabel
            label="Price"
            name="price"
            placeholder="500"
            type="number"
            register={register}
            error={errors?.price}
            required
          />
        </div>
        <div>
          <InputWithLabel
            label="Discount (in percentage)"
            name="discount"
            placeholder="5"
            type="number"
            register={register}
            error={errors?.discount}
            required
          />
        </div>
        <div>
          <InputWithLabel
            label="Demo Url"
            name="demo_url"
            placeholder="ex"
            register={register}
            error={errors?.demo_url}
            required
          />
        </div>
        <div>
          <SelectWithLabel
            label="Level"
            name="level"
            options={LEVEL_OPTIONS}
            error={errors?.level}
            register={register}
            required
          />
        </div>

        <div className="col-span-full">
          <DragDropImageInput
            key={watch("thumbnail")}
            name="thumbnail"
            defaultPreview={watch("thumbnail")}
            error={errors.thumbnail}
            handleImageChange={handleThumbnailChange}
            isLoading={isThumbnailLoading}
          />
        </div>

        <div className="col-span-full  flex justify-end">
          <Button className="max-w-[300px]">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default CourseInfoSection;
