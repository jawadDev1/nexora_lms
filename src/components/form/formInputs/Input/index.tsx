import cn from "@/utils/cn";
import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const INPUT_TYPES: { [key: string]: { [key: string]: boolean } } = {
  number: { valueAsNumber: true },
  date: { valueAsDate: true },
  "datetime-local": { valueAsDate: true },
  default: {},
  string: {},
};

const Input = <TFieldValues extends FieldValues>({
  className,
  register,
  name,
  ...props
}: InputProps<TFieldValues>) => {
  const type = props?.type ?? "default";
  const options = INPUT_TYPES[type];

  return (
    <input
      {...register(name, options)}
      {...props}
      className={cn(
        `w-full mt-1 h-[44px] bg-transparent placeholder:text-white/70  text-white lg:h-[45px] px-2 py-2 border border-gray-border rounded-md focus:border-primary focus:outline-0`,
        className
      )}
    />
  );
};

export default Input;
