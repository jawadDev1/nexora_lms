"use client";
import React, { useEffect } from "react";
import { PROFILE_SIDEBAR_MENU } from "@/constants/menu";
import Subtitle2 from "@/components/ui/typography/Subtitle2";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import cn from "@/utils/cn";
import { signOut, useSession } from "next-auth/react";
import NextImage from "@/components/ui/common/NextImage";
import Title from "@/components/ui/typography/Title";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const { data, status } = useSession();
  const user = data?.user;
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (!user) return null;

  const handleLogout = () => {
    signOut();
  };

  return (
    <aside className="w-full px-4 py-6 md:py-9  bg-card rounded-xl">
      <div className="text-center">
        <div className="size-16 mx-auto md:size-36 rounded-full overflow-hidden">
          <NextImage src={user.avatar} />
        </div>

        <Title className="mt-4">{user.name}</Title>
      </div>
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
        {user && user.role === "Admin" && (
          <Link
            href={"/hokage"}
            className={cn("py-1 px-3 hover:bg-gold-fade  inline-block")}
          >
            <Subtitle2>Hokage Panel</Subtitle2>
          </Link>
        )}
        <div
          onClick={handleLogout}
          className={cn(
            "py-1 cursor-pointer px-3 hover:bg-gold-fade  inline-block"
          )}
        >
          <Subtitle2>Logout</Subtitle2>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
