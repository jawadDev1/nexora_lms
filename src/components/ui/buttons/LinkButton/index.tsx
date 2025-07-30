import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";
import Link from "next/link";

interface Props extends BaseProps {
  href: string;
  varient?: IButtonVarients;
}

export type IButtonVarients = "default" | "outline";

export const VARIENTS = {
  default: "bg-primary hover:bg-primary/80 text-card",
  outline:
    "bg-transparent border border-white hover:bg-primary hover:border-primary hover:text-card transition-colors duration-200",
};

const LinkButton = ({
  children,
  className,
  href,
  varient = "default",
  ...props
}: Props) => {
  const btn = VARIENTS[varient];

  return (
    <Link href={href}>
      <button
        className={cn(
          "w-full py-2 px-4  focus:outline-none  rounded-md ",
          btn,
          className
        )}
        {...props}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
