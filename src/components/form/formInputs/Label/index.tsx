import cn from "@/utils/cn";

interface LabelProps {
  className?: string;
  required?: boolean;
  label: string;
  name: string;
}

const Label = ({ className, name, label, required }: LabelProps) => {
  return (
    <label htmlFor={name} className={cn("text-charcoal ", className)}>
      {label} {required && <span className="text-red-600">*</span>}
    </label>
  );
};

export default Label;
