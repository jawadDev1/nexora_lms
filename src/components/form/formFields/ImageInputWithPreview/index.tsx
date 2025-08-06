import React, { useState } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import NextImage from "@/components/ui/common/NextImage";
import { CgEditFade } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";

type InputWithLabelProps<TFieldValues extends FieldValues> = {
  className?: string;
  name: Path<TFieldValues>;
  error: FieldError | undefined;
  setValue: UseFormSetValue<TFieldValues>;
  defaultPreview: string | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

// const previewAavatar = "/images/avatar-preview.png";

const ImageInputWithPreview = <TFieldValues extends FieldValues>({
  className,
  name,
  setValue,
  error,
  defaultPreview,
}: InputWithLabelProps<TFieldValues>) => {
  const [preview, setPreview] = useState<string | null>(defaultPreview);

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files && e.target.files[0];
    if (!file) return;

    setValue(name, file as TFieldValues[typeof name]);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="flex gap-x-3">
        {" "}
        <label
          htmlFor={name}
          className="size-28 rounded-full lg:size-32  mx-auto border-2 border-primary col-span-full mb-6 lg:mb-8 relative cursor-pointer "
        >
          <input
            id={name}
            type="file"
            className="hidden"
            onChange={handleAvatar}
          />

          {preview && (
            <NextImage
              src={preview}
              className="rounded-full overflow-hidden  object-cover"
            />
          )}
          <span className="absolute bg-gray-100 rounded-full right-0 bottom-0 z-10">
            <BiEditAlt size={22} className="text-bg" />
          </span>
        </label>
        {error && (
          <p className="text-tomato-red text-sm mt-1" role="alert">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default ImageInputWithPreview;
