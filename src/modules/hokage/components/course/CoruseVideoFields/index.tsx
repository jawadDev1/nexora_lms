import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import TextareaWithLabel from "@/components/form/formFields/TextareaWithLabel";
import Button from "@/components/ui/buttons/Button";
import Subtitle from "@/components/ui/typography/Subtitle";
import Subtitle2 from "@/components/ui/typography/Subtitle2";
import { CourseContentFormData } from "@/schemas/course.schema";
import cn from "@/utils/cn";
import React from "react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { BiChevronDown, BiTrash } from "react-icons/bi";
import { videoItem } from "../CourseContentSection";

interface CourseVideoFieldsProps {
  control: Control<CourseContentFormData>;
  sectionIndex: number;
  handleDeleteSection: (sectionIndex: number) => void;
  register: UseFormRegister<CourseContentFormData>;
  errors: FieldErrors<CourseContentFormData>;
  watch: UseFormWatch<CourseContentFormData>;
  contentsState: {
    [key: string]: boolean;
  };
  handleContentsState: (sectionIndex: number) => void;
}

const CourseVideoFields = ({
  control,
  errors,
  handleDeleteSection,
  register,
  sectionIndex,
  watch,
  contentsState,
  handleContentsState,
}: CourseVideoFieldsProps) => {
  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    control,
    name: `contents.${sectionIndex}.videos`,
  });
  return (
    <div
      key={sectionIndex}
      className={cn("bg-card w-full rounded-xl h-fit px-5 py-3 ", {
        "flex justify-center": !contentsState[sectionIndex],
      })}
    >
      <div className="flex w-full justify-between shrink-0 items-center">
        <Subtitle2>{watch(`contents.${sectionIndex}.video_section`)}</Subtitle2>

        <div className="flex gap-x-2 items-center">
          {sectionIndex > 0 && (
            <span
              onClick={() => handleDeleteSection(sectionIndex)}
              className="text-white cursor-pointer hover:text-tomato-red"
            >
              <BiTrash size={20} />
            </span>
          )}
          <span
            onClick={() => handleContentsState(sectionIndex)}
            className={cn("text-white cursor-pointer hover:text-primary", {
              "rotate-180": contentsState[sectionIndex],
            })}
          >
            <BiChevronDown size={25} />
          </span>
        </div>
      </div>

      {/* Fields */}
      <div
        className={cn(
          " h-auto opacity-100 max-h-fit gap-5 transition-all duration-300  mt-3",
          {
            "h-0 overflow-hidden opacity-0": !contentsState[sectionIndex],
          }
        )}
      >
        <div>
          <InputWithLabel
            name={`contents.${sectionIndex}.video_section`}
            label="Video Section"
            register={register}
            error={errors?.contents?.[sectionIndex]?.video_section}
            required
          />
        </div>
        {videoFields.map((video, videoIndex) => (
          <div key={videoIndex} className="grid grid-cols-2 gap-5 mt-4">
            <div
              className={cn(
                "col-span-full flex justify-between items-center ",
                {
                  "border-t border-light-gray pt-4": videoIndex !== 0,
                }
              )}
            >
              <Subtitle>
                {watch(
                  `contents.${sectionIndex}.videos.${videoIndex}.video_title`
                ) || `Video ${videoIndex + 1}`}
              </Subtitle>
              {videoIndex > 0 && (
                <span
                  onClick={() => removeVideo(videoIndex)}
                  className="text-white cursor-pointer hover:text-tomato-red"
                >
                  <BiTrash size={20} />
                </span>
              )}
            </div>
            <div>
              <InputWithLabel
                name={`contents.${sectionIndex}.videos.${videoIndex}.video_title`}
                label="Video Title"
                register={register}
                error={
                  errors?.contents?.[sectionIndex]?.videos?.[videoIndex]
                    ?.video_title
                }
                autoFocus
                required
              />
            </div>

            <div className="col-span-full">
              <TextareaWithLabel
                name={`contents.${sectionIndex}.videos.${videoIndex}.video_description`}
                label="Video Description"
                register={register}
                error={
                  errors?.contents?.[sectionIndex]?.videos?.[videoIndex]
                    ?.video_description
                }
                required
              />
            </div>
            <div>
              <InputWithLabel
                name={`contents.${sectionIndex}.videos.${videoIndex}.video_url`}
                label="Video URL"
                register={register}
                error={
                  errors?.contents?.[sectionIndex]?.videos?.[videoIndex]
                    ?.video_url
                }
                required
              />
            </div>

            <div>
              <InputWithLabel
                type="number"
                name={`contents.${sectionIndex}.videos.${videoIndex}.video_length`}
                label="Video Length (minutes)"
                register={register}
                error={
                  errors?.contents?.[sectionIndex]?.videos?.[videoIndex]
                    ?.video_length
                }
                required
              />
            </div>
            <div>
              <InputWithLabel
                name={`contents.${sectionIndex}.videos.${videoIndex}.video_link_title`}
                label="Link Title"
                placeholder="Link Title"
                register={register}
                error={
                  errors?.contents?.[sectionIndex]?.videos?.[videoIndex]
                    ?.video_link_title
                }
              />
            </div>
            <div>
              <InputWithLabel
                name={`contents.${sectionIndex}.videos.${videoIndex}.video_link_url`}
                label="Link Url"
                placeholder="https://example.com"
                register={register}
                error={
                  errors?.contents?.[sectionIndex]?.videos?.[videoIndex]
                    ?.video_link_url
                }
              />
            </div>
          </div>
        ))}
        <div className=" mt-5 flex justify-end">
          <Button
            type="button"
            onClick={() => appendVideo(videoItem)}
            className="max-w-[150px]"
          >
            Add Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseVideoFields;
