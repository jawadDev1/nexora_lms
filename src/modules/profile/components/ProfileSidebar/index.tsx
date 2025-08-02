"use client";
import React from "react";
import ProfileBadge from "../ProfileBadge";
import { PROFILE_SIDEBAR_MENU } from "@/constants/menu";
import Subtitle2 from "@/components/ui/typography/Subtitle2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "@/utils/cn";

const ProfileSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full px-4 py-6 md:py-9  bg-card rounded-xl">
      <ProfileBadge />
      <div className="w-full h-px bg-white/40 my-5" />

      <div className="flex flex-col gap-5">
        {PROFILE_SIDEBAR_MENU.map((item) => (
          <Link
            className={cn("py-1 px-3 hover:bg-gold-fade  inline-block", {
              "bg-gold-fade": pathname === item.slug,
            })}
            href={`${item.slug}`}
            key={item.slug}
          >
            <Subtitle2>{item.title}</Subtitle2>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default ProfileSidebar;
