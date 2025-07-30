import { BaseButtonProps } from "@/types/common";
import cn from "@/utils/cn";
import { IButtonVarients, VARIENTS } from "../LinkButton";

interface ButtonProps extends BaseButtonProps {
  varient?: IButtonVarients;
}

const Button = ({
  children,
  className,
  varient = "default",
  ...props
}: ButtonProps) => {
  const btn = VARIENTS[varient];
  return (
    <button
      className={cn(
        "w-full py-2 px-4  focus:outline-none  rounded-md",
        btn,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
