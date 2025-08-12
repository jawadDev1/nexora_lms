import React from "react";
import NextImage from "../NextImage";
import cn from "@/utils/cn";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn("w-12", className)}>
      <NextImage src={"/images/logo.png"} className="object-cover" />
    </Link>
  );
};

export default Logo;
