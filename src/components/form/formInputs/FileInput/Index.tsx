import cn from "@/utils/cn";
import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValues extends FieldValues> = {
  className?: string;
  register?: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  children?: React.ReactNode | string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FileInput = <TFieldValues extends FieldValues>({
  className,
  register,
  children,
  name,
  ...props
}: InputProps<TFieldValues>) => {
  return (
    <label
      className="w-fit px-2 py-2 cursor-pointer   text-sm text-charcoal block "
      htmlFor={name}
    >
      {children ?? <p>Upload a file</p>}
      <input
        type="file"
        {...(register ? register(name) : {})}
        {...props}
        className={cn(`hidden`, className)}
      />
    </label>
  );
};

export default FileInput;
