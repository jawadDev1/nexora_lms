"use client";
import ImageInputWithPreview from "@/components/form/formFields/ImageInputWithPreview";
import InputWithLabel from "@/components/form/formFields/InputWithLabel";
import Button from "@/components/ui/buttons/Button";
import { profileSchema, ProfileSchemaData } from "@/schemas/profile.schema";
import { uploadImageToAppwrite } from "@/utils/uploadFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UPDATE_PROFILE } from "../../actions";
import { notifyError, notifySuccess } from "@/utils/toast";
import SpinnerButton from "@/components/ui/buttons/SpinnerButton";
import Label from "@/components/form/formInputs/Label";
import Input from "@/components/form/formInputs/Input";

const ProfileInfoPage = () => {
  const { data: session, status, update } = useSession();
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setValue,
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<ProfileSchemaData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileSchemaData) => {
    setIsLoading(true);
    let avatar = defaultImage ?? "";
    if (data.profile) {
      const new_image = await uploadImageToAppwrite(data.profile);
      avatar = new_image ? new_image : avatar;
    }

    const result = await UPDATE_PROFILE({ name: data.name, avatar });

    if (!result.success) {
      notifyError(result.message);
      setIsLoading(false);
      return;
    }

    if (result.data)
      await update({
        user: {
          ...session?.user,
          name: result.data?.name,
          avatar: result.data.avatar,
        },
      });

    setIsLoading(false);
    notifySuccess(result.message);
  };

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {
      reset({ name: session.user.name!, email: session.user.email });

      setDefaultImage(session.user.avatar);
    }
  }, [session?.user]);

  return (
    <div className="bg-card  rounded-xl py-5 px-5">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] mx-auto">
        <div>
          <ImageInputWithPreview
            key={defaultImage}
            defaultPreview={defaultImage}
            error={errors.profile}
            name="profile"
            setValue={setValue}
          />
        </div>

        <div>
          <InputWithLabel
            error={errors?.name}
            label="Name"
            name="name"
            register={register}
            required
          />
        </div>
        <div className="mt-5">
          <Label label="Email" name="email" />
          <Input
            placeholder="Email"
            name="email"
            register={register}
            readOnly
            disabled
          />
        </div>
        <div className="flex justify-center">
          <SpinnerButton
            isLoading={isLoading}
            className="max-w-[200px] mt-5 mx-auto w-[200px]"
          >
            Update
          </SpinnerButton>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoPage;
