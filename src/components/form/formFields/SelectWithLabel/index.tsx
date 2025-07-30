import React from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import Label from "../../formInputs/Label";
import Select from "../../formInputs/Select";

type InputWithLabelProps<TFieldValues extends FieldValues> = {
  className?: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  options: { label: string; value: string }[];
  error: FieldError | undefined;
} & React.InputHTMLAttributes<HTMLSelectElement>;

const SelectWithLabel = <TFieldValues extends FieldValues>({
  className,
  label,
  required = false,
  name,
  register,
  error,
  options,
  ...props
}: InputWithLabelProps<TFieldValues>) => {
  return (
    <>
      <Label label={label} name={name as string} required={required} />
      <Select {...{ className, register, name, options, ...props }} />
      {error && (
        <p className="text-tomato-red text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </>
  );
};

export default SelectWithLabel;
