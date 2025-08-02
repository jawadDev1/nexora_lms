import { BaseProps } from "@/types/common";
import cn from "@/utils/cn";
import React from "react";

const ProfilePageWrapper = ({ children, className }: BaseProps) => {
  return (
    <div className={cn("bg-card rounded-xl py-5 px-5", className)}>
        {children}
    </div>
  );
};

export default ProfilePageWrapper;
