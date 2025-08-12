"use client";
import Button from "@/components/ui/buttons/Button";
import Content from "@/components/ui/typography/Content";
import { Pencil, Star } from "lucide-react";
import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import CourseReviewModal from "../../modals/CourseReviewModal";

interface GiveCourseReviewProps {
  courseId: string;
  handleAfterReview: () => void;
}

const GiveCourseReview = ({
  courseId,
  handleAfterReview,
}: GiveCourseReviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
    handleAfterReview();
  };

  return (
    <>
      <CourseReviewModal
        isOpen={isOpen}
        handleModal={handleModal}
        courseId={courseId}
      />
      <div className="mb-5 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-light-gray/20 p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 shrink-0">
              <BsStarFill size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                Give Review
              </h3>
            </div>
          </div>

          <Content className="text-light-gray/90 leading-relaxed mb-6 text-sm">
            Enjoyed the course? Leave a review and help us make it even better
            for you and others.
          </Content>

          <Button
            onClick={() => setIsOpen(true)}
            varient="outline"
            className="max-w-fit flex items-center gap-1 bg-primary/5 border-primary/30 text-primary hover:bg-primary hover:text-bg hover:border-primary transition-all duration-300 font-medium px-6 py-2.5 rounded-xl group/btn"
          >
            <Pencil size={15} />
            Review
          </Button>
        </div>
      </div>
    </>
  );
};

export default GiveCourseReview;
