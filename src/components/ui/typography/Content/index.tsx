import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";

const Content = ({ className, children, ...props }: BaseProps) => {
  return (
    <p
      className={cn(" text-content-sm lg:text-content text-white/60 ", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export default Content;
