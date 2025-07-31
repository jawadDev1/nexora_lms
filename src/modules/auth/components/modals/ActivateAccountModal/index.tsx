import React, { useState, useRef, useEffect } from "react";
import ModalWrapper from "../../../../../components/modals/ModalWrapper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import { CgClose } from "react-icons/cg";
import { IoShieldCheckmark } from "react-icons/io5";
import { IAuthModals } from "@/modules/auth/UserNav";
import { OTPFormData, otpSchema } from "@/schemas/otp.shema";
import { VERIFY_USER } from "@/modules/auth/actions";
import { notifyError, notifySuccess } from "@/utils/toast";

interface OTPVerificationModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleModal: (type: IAuthModals) => void;
}

const OTPVerificationModal = ({
  isOpen,
  handleCloseModal,
  handleModal,
}: OTPVerificationModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otpValue = watch("otp");

  // Timer for OTP expiry
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: OTPFormData) => {
    setIsLoading(true);
    try {
      const result = await VERIFY_USER(data.otp);

      if (!result?.success) {
        notifyError(result.message);
        return;
      }

      notifySuccess(result.message);
      handleModal("login");
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (value: string, index: number) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length <= 1) {
      const newOTP = otpValue.split("");
      newOTP[index] = numericValue;
      const updatedOTP = newOTP.join("").slice(0, 6);
      setValue("otp", updatedOTP);

      // Auto-focus next input
      if (numericValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    setValue("otp", pastedData);

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      className="py-8 relative px-6 max-w-md mx-auto"
    >
      <span
        onClick={handleCloseModal}
        className="absolute cursor-pointer right-6 top-6 hover:bg-card rounded-full p-1 transition-colors duration-200"
      >
        <CgClose size={24} className="text-light-gray hover:text-white" />
      </span>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <IoShieldCheckmark size={32} className="text-primary" />
        </div>
        <SectionTitle className="mb-2">Verify Your Email</SectionTitle>
        <p className="text-light-gray text-sm">
          We've sent a 6-digit verification code.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-center text-white mb-3">
                  Enter Verification Code
                </label>
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={otpValue[index] || ""}
                      onChange={(e) => handleOTPChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className={`w-12 h-12 text-center text-xl font-bold rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                        errors.otp
                          ? "border-red-500 bg-red-500/10"
                          : otpValue[index]
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-light-gray/30 bg-card hover:border-light-gray/50 focus:border-primary"
                      } text-white`}
                    />
                  ))}
                </div>
              </div>
            )}
          />

          {errors.otp && (
            <p className="text-red-400 text-sm text-center">
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* Timer and Resend */}
        <div className="text-center space-y-3">
          <p className="text-light-gray text-sm">
            Code expires in{" "}
            <span className="text-primary font-mono font-bold">
              {formatTime(timeLeft)}
            </span>
          </p>
        </div>

        <SpinnerButton
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
          isLoading={isLoading}
          disabled={otpValue.length !== 6}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </SpinnerButton>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-light-gray">
          Having trouble?{" "}
          <button
            onClick={() => handleModal("login")}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
          >
            Go back to login
          </button>
        </p>
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-card/50 rounded-lg border border-light-gray/20">
        <p className="text-xs text-light-gray text-center">
          🔒 For your security, never share this code with anyone
        </p>
      </div>
    </ModalWrapper>
  );
};

export default OTPVerificationModal;
