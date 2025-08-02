"use client";
import NextImage from "@/components/ui/common/NextImage";
import Title from "@/components/ui/typography/Title";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProfileBadge = () => {
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

  return (
    <div className="text-center">
      <div className="size-16 mx-auto md:size-36 rounded-full overflow-hidden">
        <NextImage src={user.avatar} />
      </div>

      <Title className="mt-4">{user.name}</Title>
    </div>
  );
};

export default ProfileBadge;
