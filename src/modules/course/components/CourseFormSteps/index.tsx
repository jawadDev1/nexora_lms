import Subtitle3 from "@/components/ui/typography/Subtitle3";
import { useCourseForm } from "@/stores/course-form-store";
import cn from "@/utils/cn";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

const STEPS = ["Course Info", "Course Options", "Course Content", "Preview Course"];

const CourseFormSteps = () => {
  const { currentStepIndex } = useCourseForm();

  return (
    <div className="bg-card h-fit sticky top-0 rounded-xl px-5 py-4">
      {STEPS.map((curr, i) => (
        <div key={i} className="h-fit flex   justify-start gap-x-2">
          <div className="flex flex-col items-center gap-x-2">
            <span
              className={cn(" bg-primary/10 rounded-full p-1 text-white", {
                "bg-primary": currentStepIndex > i,
              })}
            >
              <AiOutlineCheck size={22} />
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={cn("h-[30px] w-1 rounded shrink-0   bg-primary/10", {
                  "bg-primary": currentStepIndex > i,
                })}
              />
            )}
          </div>

          <Subtitle3 className="text-center py-1">{curr}</Subtitle3>
        </div>
      ))}
    </div>
  );
};

export default CourseFormSteps;
