"use client";
import React, { useState } from "react";
import CheckoutFormModal from "../CheckoutFormModal";
import StripeProvider from "../../providers/StripeProvider";
import Link from "next/link";

interface CourseEnrollProps {
  isEnrolled: boolean;
  courseId: string;
  amount: number;
  slug: string;
}

const CourseEnroll = ({
  isEnrolled,
  courseId,
  amount,
  slug,
}: CourseEnrollProps) => {
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

      {!isEnrolled && (
        <button
          onClick={toggleModal}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition-colors bg-primary text-black hover:bg-yellow-400 `}
        >
          Enroll Now
        </button>
      )}
      {isEnrolled && (
        <Link href={`/course/my-courses/${slug}`}>
          <button
            className={`w-full py-3 px-4 rounded-lg font-semibold text-lg transition-colors bg-green-600 text-white hover:bg-green-700 `}
          >
            Continue Learning{" "}
          </button>
        </Link>
      )}
    </>
  );
};

export default CourseEnroll;
