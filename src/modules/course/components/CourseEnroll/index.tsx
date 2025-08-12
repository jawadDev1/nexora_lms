"use client";
import React, { useState } from "react";
import CheckoutFormModal from "../CheckoutFormModal";
import StripeProvider from "../../providers/StripeProvider";

interface CourseEnrollProps {
  isEnrolled: boolean;
  courseId: string;
  amount: number;
}

const CourseEnroll = ({ isEnrolled, courseId, amount }: CourseEnrollProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {isOpen && (
        <StripeProvider amount={amount}>
          <CheckoutFormModal
            handleCloseModal={toggleModal}
            isOpen={isOpen}
            courseId={courseId}
          />
        </StripeProvider>
      )}
      <button
        onClick={toggleModal}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition-colors ${
          isEnrolled
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-primary text-black hover:bg-yellow-400"
        }`}
      >
        {isEnrolled ? "Continue Learning" : "Enroll Now"}
      </button>
    </>
  );
};

export default CourseEnroll;
