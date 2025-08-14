import NextImage from "@/components/ui/common/NextImage";
import Spinner from "@/components/ui/extra/Spinner";
import cn from "@/utils/cn";
import React, { DragEvent, useState } from "react";
import { FieldError, FieldValues, Path } from "react-hook-form";

type DragDropImageInputProps<TFieldValues extends FieldValues> = {
  className?: string;
  label?: string;
  name: Path<TFieldValues>;
  error: FieldError | undefined;
  isLoading: boolean;
  defaultPreview?: string | null;
  handleImageChange: (file: File) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DragDropImageInput = <TFieldValues extends FieldValues>({
  name,
  error,
  handleImageChange,
  isLoading,
  defaultPreview,
  label = "Drag and Drop a image or click here",
}: DragDropImageInputProps<TFieldValues>) => {
  const [preview, setPreview] = useState<string | null>(defaultPreview ?? null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) handleImage(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files && e.target.files[0];
    if (file) handleImage(file);
  };

  const handleImage = async (file: File) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    handleImageChange(file);
  };

  return (
    <>
      <label
        htmlFor={name}
        className={cn(
          "w-full flex justify-center items-center  h-[20vh] border bg-transparent rounded focus:border-primary relative ",
          { "bg-primary/10": isDragging, "h-[50vh]": preview }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
      >
        {isLoading && (
          <div className="absolute left-0 w-full h-full bg-dark-brown/80 flex justify-center items-center z-10 top-0">
            <Spinner />
          </div>
        )}

        <input
          type="file"
          onChange={handleFileChange}
          name={name}
          id={name}
          className="hidden"
        />
        {preview && (
          <div className="size-[98%]">
            <NextImage src={preview} />
          </div>
        )}
        {!preview && label}
      </label>
      {error && (
        <p className="text-tomato-red text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </>
  );
};

export default DragDropImageInput;
