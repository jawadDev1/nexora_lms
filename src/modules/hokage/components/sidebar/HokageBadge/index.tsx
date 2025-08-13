'use client';
import NextImage from "@/components/ui/common/NextImage";
import Subtitle2 from "@/components/ui/typography/Subtitle2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HokageBadge = () => {
  const { data, status } = useSession();
  const user = data?.user;
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!user || user.role !== 'Admin') {
      router.push("/");
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="text-center hidden lg:block">
      <div className="size-16 mx-auto md:size-24 rounded-full overflow-hidden">
        <NextImage src={user.avatar} />
      </div>

      <Subtitle2 className="mt-4">{user.name}</Subtitle2>
    </div>
  );
};

export default HokageBadge;
