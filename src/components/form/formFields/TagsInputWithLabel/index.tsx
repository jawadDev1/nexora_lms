import type {
  FieldError,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import type { Tag } from "react-tag-input";
import Label from "../../formInputs/Label";
import TagsInput from "../../formInputs/TagsInput";

type InputWithLabelProps<TFieldValues extends FieldValues> = {
  className?: string;
  setValue: UseFormSetValue<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  error: FieldError | undefined;
  defaultTags?: string[];
};

const TagsInputWithLabel = <TFieldValues extends FieldValues>({
  label,
  required = false,
  name,
  setValue,
  error,
  defaultTags = [],
}: InputWithLabelProps<TFieldValues>) => {
  const refactoredTags: Tag[] =
    defaultTags?.length > 0
      ? defaultTags.map((tag) => ({ id: tag, text: tag, className: "" }))
      : [];

  return (
    <>
      <Label label={label} name={name as string} required={required} />
      <TagsInput {...{ setValue, name, defaultTags: refactoredTags }} />
      {error && (
        <p className="text-tomato-red text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </>
  );
};

export default TagsInputWithLabel;
