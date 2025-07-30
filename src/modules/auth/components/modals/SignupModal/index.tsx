import React, { useState } from "react";
import ModalWrapper from "../../../../../components/modals/ModalWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import Link from "next/link";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import Title from "@/components/ui/typography/Title";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import { CgClose } from "react-icons/cg";
import { SignupFormData, signupSchema } from "@/schemas/signup.schema";
import FileInputWithPreview from "@/components/form/formFields/FileInputWithPreview";
import { IAuthModals } from "@/modules/auth/UserNav";

interface LoginModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleModal: (type: IAuthModals) => void;
}

const SignupModal = ({
  isOpen,
  handleCloseModal,
  handleModal,
}: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: SignupFormData) => {};

  return (
    <ModalWrapper isOpen={isOpen} className="py-5 relative md:py-8 px-5 ">
      <span
        onClick={handleCloseModal}
        className="absolute cursor-pointer right-7 top-8"
      >
        <CgClose size={27} />
      </span>
      <SectionTitle className="mb-8 text-center">Sign up</SectionTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[90%] mx-auto space-y-5 lg:space-y-6 "
      >
        <div>
          <InputWithLabel
            type="text"
            placeholder="Uzumaki Naruto"
            label="Name"
            name="name"
            register={register}
            error={errors?.name}
            required
          />
        </div>

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
            placeholder="*****"
            label="Password"
            name="password"
            error={errors?.password}
            register={register}
            required
          />
        </div>

        <div className="">
          <FileInputWithPreview
            name="profile"
            error={errors?.profile}
            register={register}
            setValue={setValue}
            required={true}
            label="Profile"
            id="profile"
            accept=".jpg,.jpeg,.png"
          />
        </div>

        <SpinnerButton isLoading={isLoading}>Signup</SpinnerButton>
      </form>
      <div className="mt-5 text-center">
        <p className="text-sm text-charcoal-gray">
          Already have an account?{" "}
          <span
            onClick={() => handleModal("login")}
            className="text-primary cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </ModalWrapper>
  );
};

export default SignupModal;
