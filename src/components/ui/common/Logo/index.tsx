import React from "react";
import NextImage from "../NextImage";
import cn from "@/utils/cn";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn("w-8 shrink-0 inline-block lg:w-12", className)}>
      <NextImage src={"/images/logo.png"} className="object-cover" />
    </Link>
  );
};

export default Logo;
