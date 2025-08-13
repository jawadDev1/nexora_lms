import Subtitle2 from "@/components/ui/typography/Subtitle2";
import { BaseProps } from "@/types/common";
import cn from "@/utils/cn";
import Link from "next/link";
import React from "react";

interface SidebarItemProps extends BaseProps {
  href: string;
  isActive: boolean;
}

const SidebarItem = ({
  children,
  className,
  href,
  isActive,
}: SidebarItemProps) => {
  return (
    <Link
      className={cn("lg:py-1 lg:px-3  hover:bg-gold-fade ", className, {
        "bg-gold-fade text-primary lg:text-white": isActive,
      })}
      href={href}
    >
      {children}
    </Link>
  );
};

export default SidebarItem;
