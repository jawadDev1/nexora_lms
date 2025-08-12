"use client";
import "./style.css";
import React, { FormEvent, useState } from "react";
import { CgClose } from "react-icons/cg";
import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import ModalWrapper from "@/components/modals/ModalWrapper";
import Button from "@/components/ui/buttons/Button";
import { notifyError } from "@/utils/toast";
import { CREATE_ORDER } from "../../actions";
import { useRouter } from "next/navigation";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";

interface CheckoutFormModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  courseId: string;
}

const CheckoutFormModal = ({
  isOpen,
  handleCloseModal,
  courseId,
}: CheckoutFormModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      notifyError(error.message || "Something went wrong");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const result = await CREATE_ORDER({
        courseId,
        paymentId: paymentIntent.id,
      });

      setIsLoading(false);
      if (!result.success) {
        notifyError(result.message);
        return;
      }

      handleCloseModal();
      router.push("/profile/courses");
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      className="py-8 lg:max-h-auto relative px-6 max-w-md mx-auto"
    >
      <span
        onClick={handleCloseModal}
        className="absolute cursor-pointer right-6 top-6 hover:bg-card rounded-full p-1 transition-colors duration-200"
      >
        <CgClose size={24} className="text-light-gray hover:text-white" />
      </span>

      <form id="payment-form" className="mt-5 w-full" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          className=" w-full "
          id="link-authentication-element"
        />
        <PaymentElement id="payment-element" />
        <div className="flex justify-end">
          <SpinnerButton
            isLoading={isLoading}
            className="max-w-[200px] mx-auto mt-6"
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            Pay now
          </SpinnerButton>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default CheckoutFormModal;
