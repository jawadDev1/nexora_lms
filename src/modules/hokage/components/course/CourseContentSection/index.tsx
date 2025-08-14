import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import {
  course_content_schema,
  CourseContentFormData,
} from "@/schemas/course.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Subtitle2 from "@/components/ui/typography/Subtitle2";
import { BiChevronDown, BiTrash } from "react-icons/bi";
import TextareaWithLabel from "@/components/form/formFields/TextareaWithLabel";
import cn from "@/utils/cn";
import Button from "@/components/ui/buttons/Button";
import { useCourseForm } from "@/stores/course-form-store";
import Subtitle from "@/components/ui/typography/Subtitle";
import CourseVideoFields from "../CoruseVideoFields";

export const videoItem = {
  video_title: "",
  video_url: "",
  video_thumbnail: "",
  video_description: "",
  video_link_title: "",
  video_link_url: "",
  video_length: 0,
};

const newItem = {
  video_section: "Untitled",
  videos: [videoItem],
};

const CourseContentSection = () => {
  const { handleNextStep, handlePreviousStep, handleGetSectionData } =
    useCourseForm();
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(course_content_schema),
    defaultValues: {
      contents: [newItem],
    },
  });

  const { fields, append, remove } = useFieldArray<CourseContentFormData>({
    control,
    name: "contents" as unknown as any,
  });

  // To manage sections dropdown
  const [contentsState, setContentsState] = useState<{
    [key: string]: boolean;
  }>({ 0: true });

  // Handle open close section drop down
  const handleContentsState = (index: number) => {
    setContentsState((prev) => ({
      ...prev,
      [index]: !contentsState[index],
    }));
  };

  // Add a new Section
  const handleAddSection = () => {
    append(newItem);
    const index = Object.keys(contentsState).length;
    setContentsState((prev) => ({ ...prev, [index]: true }));
  };

  const handleDeleteSection = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: CourseContentFormData) => {
    handleNextStep("course_content", data);
  };

  const handlePrevious = () => {
    const data = watch();

    handlePreviousStep("course_content", data);
  };

  useEffect(() => {
    const data = handleGetSectionData("course_content");
    if (data) {
      reset(data as CourseContentFormData);
    }
  }, []);

  return (
    <div className=" h-fit flex flex-col gap-5 ">
      <div className="mt-5 flex justify-end">
        <Button className="max-w-[200px] ml-auto" onClick={handleAddSection}>
          Add Section
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {fields.map((field, sectionIndex) => (
          <CourseVideoFields
            key={sectionIndex}
            {...{
              contentsState,
              control,
              errors,
              handleContentsState,
              handleDeleteSection,
              register,
              sectionIndex,
              watch,
            }}
          />
        ))}

        {/* <DevTool control={control} /> */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            type="button"
            className="max-w-[100px]"
          >
            Previous
          </Button>

          <Button className="max-w-[100px]">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default CourseContentSection;
