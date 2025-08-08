import TagsInputWithLabel from "@/components/form/formFields/TagsInputWithLabel";
import Button from "@/components/ui/buttons/Button";
import {
  course_options_schema,
  CourseOptionsFormData,
} from "@/schemas/course.schema";
import { useCourseForm } from "@/stores/course-form-store";
import { generateRandomString } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const CourseOptionSection = () => {
  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CourseOptionsFormData>({
    resolver: zodResolver(course_options_schema),
  });

  const {
    handleNextStep,
    handlePreviousStep,
    handleGetSectionData,
    currentStepIndex,
    isUpdate,
  } = useCourseForm();
  const onSubmit = (data: CourseOptionsFormData) => {
    handleNextStep("course_options", data);
  };

  const handlePrevious = () => {
    const data = watch();

    handlePreviousStep("course_options", data);
  };

  useEffect(() => {
    const data = handleGetSectionData("course_options");

    console.log("course options =======> ", data);
    if (data) {
      reset(data as CourseOptionsFormData);
    }
  }, [currentStepIndex, isUpdate]);

  return (
    <div className="bg-card rounded-xl py-4 px-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[800px] mx-auto grid grid-cols-1 gap-5"
      >
        <div>
          <TagsInputWithLabel
            key={generateRandomString()}
            label="Benefits"
            name="benefits"
            defaultTags={watch("benefits")}
            error={errors.benefits?.[0]}
            setValue={setValue}
          />
        </div>
        <div>
          <TagsInputWithLabel
            key={generateRandomString()}
            label="Prerequisites"
            defaultTags={watch("prerequisites")}
            name="prerequisites"
            error={errors.prerequisites?.[0]}
            setValue={setValue}
          />
        </div>
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

export default CourseOptionSection;
