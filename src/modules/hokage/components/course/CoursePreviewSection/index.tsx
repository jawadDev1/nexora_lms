"use client";
import React, { useState } from "react";

import VideoPlayer from "../../../../course/components/VideoPlayer";
import { useCourseForm } from "@/stores/course-form-store";
import Title from "@/components/ui/typography/Title";
import Subtitle from "@/components/ui/typography/Subtitle";
import Content from "@/components/ui/typography/Content";
import Outcomes from "../../../../course/components/Outcomes";
import CoursePrice from "../../../../course/components/CoursePrice";
import Button from "@/components/ui/buttons/Button";
import { notifyError, notifySuccess } from "@/utils/toast";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import { useRouter } from "next/navigation";
import {
    CREATE_COURSE,
    UPDATE_COURSE,
} from "@/modules/hokage/actions/course.actions";

const CoursePreviewSection = () => {
    const { courseSectionData, handlePreviousStep, isUpdate, handleClearForm } =
        useCourseForm();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { course_info, course_options, course_content } = courseSectionData;

    if (!course_info || !course_options || !course_content)
        return <>Nothing to show</>;

    const { demo_url, description, title, price, discount } = course_info;
    const { benefits, prerequisites } = course_options;

    const handlePrevious = () => {
        handlePreviousStep("course_preview", null);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        let result;
        if (isUpdate) {
            result = await UPDATE_COURSE({
                id: isUpdate,
                course: { ...course_info, ...course_options },
                course_data: course_content.contents,
            });
        } else {
            result = await CREATE_COURSE({
                course: { ...course_info, ...course_options },
                course_data: course_content.contents,
            });
        }

        setIsLoading(false);
        if (!result.success) {
            notifyError(result.message);
            return;
        }

        notifySuccess(result.message);
        router.push("/hokage/course");
        handleClearForm();
    };

    return (
        <div className="bg-card px-5 py-6 rounded-xl">
            <VideoPlayer videoUrl={demo_url ?? ""} />

            <div className="mt-5 flex flex-col gap-y-4">
                <CoursePrice discount={discount ?? 0} price={price} />
                <Button className="max-w-[150px]">Buy Now</Button>

                <Subtitle>{title}</Subtitle>

                <Outcomes
                    title="What you will learn from this course"
                    outcomes={benefits}
                />
                <Outcomes
                    title="What are the prerequisites of this course"
                    outcomes={prerequisites}
                />
                <div>
                    <Title>Course Details</Title>
                    <Content className="mt-1">{description}</Content>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <Button
                    onClick={handlePrevious}
                    type="button"
                    className="max-w-[100px]"
                >
                    Previous
                </Button>

                <SpinnerButton
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    className="max-w-[200px]"
                >
                    {isUpdate ? "Update Course" : "Create Course"}
                </SpinnerButton>
            </div>
        </div>
    );
};

export default CoursePreviewSection;
