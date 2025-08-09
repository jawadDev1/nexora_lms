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

const newItem = {
    video_section: "Untitled",
    video_title: "",
    video_url: "",
    video_thumbnail: "",
    video_description: "",
    video_link_title: "",
    video_link_url: "",
    video_length: 0,
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
                <Button
                    className="max-w-[200px] ml-auto"
                    onClick={handleAddSection}
                >
                    Add Section
                </Button>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                {fields.map((field, index) => (
                    <div
                        key={index}
                        className={cn(
                            "bg-card w-full rounded-xl h-fit px-5 py-3 ",
                            {
                                "flex justify-center": !contentsState[index],
                            },
                        )}
                    >
                        <div className="flex w-full justify-between shrink-0 items-center">
                            <Subtitle2>
                                {watch(`contents.${index}.video_section`)}
                            </Subtitle2>
                            <div className="flex gap-x-2 items-center">
                                {index > 0 && (
                                    <span
                                        onClick={() =>
                                            handleDeleteSection(index)
                                        }
                                        className="text-white cursor-pointer hover:text-tomato-red"
                                    >
                                        <BiTrash size={20} />
                                    </span>
                                )}
                                <span
                                    onClick={() => handleContentsState(index)}
                                    className={cn(
                                        "text-white cursor-pointer hover:text-primary",
                                        {
                                            "rotate-180": contentsState[index],
                                        },
                                    )}
                                >
                                    <BiChevronDown size={25} />
                                </span>
                            </div>
                        </div>

                        {/* Fields */}
                        <div
                            className={cn(
                                "grid grid-cols-2 h-auto opacity-100 max-h-fit gap-5 transition-all duration-300  mt-3",
                                {
                                    "h-0 overflow-hidden opacity-0":
                                        !contentsState[index],
                                },
                            )}
                        >
                            <div>
                                <InputWithLabel
                                    name={`contents.${index}.video_section`}
                                    label="Video Section"
                                    placeholder="Demo"
                                    register={register}
                                    error={
                                        errors?.contents?.[index]?.video_section
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <InputWithLabel
                                    name={`contents.${index}.video_title`}
                                    label="Video Title"
                                    placeholder="HTML is a programing language"
                                    register={register}
                                    error={
                                        errors?.contents?.[index]?.video_title
                                    }
                                    required
                                />
                            </div>

                            <div className="col-span-full">
                                <TextareaWithLabel
                                    name={`contents.${index}.video_description`}
                                    label="Video Description"
                                    register={register}
                                    placeholder="Enter video description"
                                    error={
                                        errors?.contents?.[index]
                                            ?.video_description
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <InputWithLabel
                                    name={`contents.${index}.video_url`}
                                    label="Video Url"
                                    placeholder="https://example.com"
                                    register={register}
                                    error={errors?.contents?.[index]?.video_url}
                                    required
                                />
                            </div>

                            <div>
                                <InputWithLabel
                                    type="number"
                                    name={`contents.${index}.video_length`}
                                    label="Video Length (in minutes)"
                                    placeholder="20"
                                    register={register}
                                    error={
                                        errors?.contents?.[index]?.video_length
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <InputWithLabel
                                    name={`contents.${index}.video_link_title`}
                                    label="Link Title"
                                    placeholder="Link Title"
                                    register={register}
                                    error={
                                        errors?.contents?.[index]
                                            ?.video_link_title
                                    }
                                />
                            </div>
                            <div>
                                <InputWithLabel
                                    name={`contents.${index}.video_link_url`}
                                    label="Link Url"
                                    placeholder="https://example.com"
                                    register={register}
                                    error={
                                        errors?.contents?.[index]
                                            ?.video_link_url
                                    }
                                />
                            </div>
                        </div>
                    </div>
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
