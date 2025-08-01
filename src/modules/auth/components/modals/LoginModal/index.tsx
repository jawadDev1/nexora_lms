import React, { useState } from "react";
import ModalWrapper from "../../../../../components/modals/ModalWrapper";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import Link from "next/link";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import { signIn } from "next-auth/react";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import { CgClose } from "react-icons/cg";
import { IAuthModals } from "@/modules/auth/UserNav";
import { notifyError, notifySuccess } from "@/utils/toast";
import SocialLogin from "../../SocialLogin";

interface LoginModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleModal: (type: IAuthModals) => void;
}

const LoginModal = ({
  isOpen,
  handleCloseModal,
  handleModal,
}: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      ...data,
    });

    setIsLoading(false);
    if (response && response?.error?.includes("E401")) {
      handleModal("verify");
      return;
    }

    if (response && response.error && response.status === 401) {
      notifyError(response.error);
      return;
    }

    notifySuccess("Logged in successfully");
    handleCloseModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} className="py-5 relative md:py-8 px-5 ">
      <span
        onClick={handleCloseModal}
        className="absolute cursor-pointer right-7 top-8"
      >
        <CgClose size={27} />
      </span>
      <SectionTitle className="mb-8 text-center">Login</SectionTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[90%] mx-auto   space-y-5 lg:space-y-6 "
      >
        <div>
          <InputWithLabel
            type="email"
            placeholder="example@gmail.com"
            label="Email"
            name="email"
            register={register}
            error={errors?.email}
            required
          />
        </div>

        <div>
          <InputWithLabel
            type="password"
            placeholder="********"
            label="Password"
            name="password"
            error={errors?.password}
            register={register}
            required
          />
        </div>

        <Link
          href={"/forgot-password"}
          className="text-azure-blue text-end w-full block underline text-sm"
        >
          forgot password?
        </Link>
        <div className="flex justify-center w-full">
          <SpinnerButton
            className="max-w-[300px] mx-auto"
            isLoading={isLoading}
          >
            Login
          </SpinnerButton>
        </div>
      </form>
      <div className="mt-5 text-center">
        <p className="text-sm text-charcoal-gray">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => handleModal("signup")}
            className="text-primary cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
      <div className="flex justify-center gap-3 items-center mt-5">
      <SocialLogin />
      </div>
    </ModalWrapper>
  );
};

export default LoginModal;
