"use client";
import React, { useState } from "react";
import ProfilePageWrapper from "../../components/ProfileSectionWrapper";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import {
  changePasswordSchema,
  ChanngePasswordFormData,
} from "@/schemas/change_password.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import { CHANGE_PASSWORD } from "../../actions";
import { notifyError, notifySuccess } from "@/utils/toast";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChanngePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ChanngePasswordFormData) => {
    setIsLoading(true);
    const result = await CHANGE_PASSWORD(data);

    setIsLoading(false);
    if (!result.success) {
      notifyError(result.message);
      return;
    }

    notifySuccess(result.message);
  };

  return (
    <ProfilePageWrapper>
      <div className="bg-card-bg py-5 lg:py-7 px-4 rounded-lg max-w-[500px] mx-auto shadow mt-2 w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-5 lg:space-y-6 "
        >
          <div>
            <InputWithLabel
              type="password"
              placeholder="********"
              label="Old Password"
              name="old_password"
              error={errors?.old_password}
              register={register}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="password"
              placeholder="********"
              label="New Password"
              name="new_password"
              error={errors?.new_password}
              register={register}
              required
            />
          </div>

          <div>
            <InputWithLabel
              type="password"
              placeholder="********"
              label="Confirm Password"
              name="confirm_password"
              error={errors?.confirm_password}
              register={register}
              required
            />
          </div>

          <SpinnerButton isLoading={isLoading}>Change</SpinnerButton>
        </form>
      </div>
    </ProfilePageWrapper>
  );
};

export default ChangePasswordPage;
