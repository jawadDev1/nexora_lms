"use client";
import TextareaWithLabel from "@/components/form/formFields/TextareaWithLabel";
import Label from "@/components/form/formInputs/Label";
import ModalWrapper from "@/components/modals/ModalWrapper";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import Subtitle from "@/components/ui/typography/Subtitle";
import { ADD_REVIEW } from "@/modules/course/actions";
import { ReviewFormData, reviewSchema } from "@/schemas/review.schema";
import { notifyError, notifySuccess } from "@/utils/toast";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CgClose } from "react-icons/cg";

interface Props {
  courseId: string;
  isOpen: boolean;
  handleModal: () => void;
}

const intialState = {
  rating: 1,
  comment: "",
};

const CourseReviewModal = ({ courseId, isOpen, handleModal }: Props) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: intialState,
  });

  const formData = watch();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ReviewFormData) => {
    setIsLoading(true);

    const result = await ADD_REVIEW({ ...data, courseId });

    if (!result.success) {
      notifyError(result.message);
      return;
    }

    setIsLoading(false);
    notifySuccess(result.message);
    handleModal();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      className="lg:max-w-[800px] px-5 lg:max-h-[700px]"
    >
      <div className="flex lg:justify-center items-center flex-col h-full overflow-y-auto py-5 lg:pt-0 gap-6 relative">
        <span
          onClick={handleModal}
          className="absolute top-1 lg:top-8 cursor-pointer right-2 lg:right-7"
        >
          <CgClose size={26} />
        </span>
        <Subtitle>Give a Review</Subtitle>

        <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] space-y-5 ">
          <div>
            <Label label="Give a rating" required name="rating" />
            <div className="flex items-center gap-3">
              {Array.from({ length: 5 }).map((_, i: number) => {
                const rating = formData.rating;
                if (rating > i) {
                  return (
                    <AiFillStar
                      key={i}
                      onClick={() => setValue("rating", i + 1)}
                      size={33}
                      color="#efe909"
                      className="cursor-pointer"
                    />
                  );
                } else {
                  return (
                    <AiOutlineStar
                      key={i}
                      onClick={() => setValue("rating", i + 1)}
                      size={33}
                      color="#efe909"
                      className="cursor-pointer"
                    />
                  );
                }
              })}
            </div>
          </div>

          <div className="w-full">
            <TextareaWithLabel
              error={errors?.comment}
              label="Comment"
              name="comment"
              register={register}
              className="w-full"
              required
            />
          </div>

          <DevTool control={control} />

          <SpinnerButton
            className="mt-2 mx-auto col-span-full"
            isLoading={isLoading}
          >
            Add
          </SpinnerButton>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default CourseReviewModal;
