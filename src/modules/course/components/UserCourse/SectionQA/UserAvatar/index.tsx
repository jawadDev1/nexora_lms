import React from "react";
import { User } from "lucide-react";
import NextImage from "@/components/ui/common/NextImage";

interface UserAvatarProps {
  user: {
    avatar: string;
    name: string;
  } | null;
  size?: "sm" | "md";
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
  };

  if (!user) {
    return (
      <div
        className={`${sizeClasses[size]} bg-light-gray/20 rounded-full flex items-center justify-center`}
      >
        <User className="w-3 h-3 text-light-gray" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden bg-light-gray/20`}
    >
      {user.avatar ? (
        <NextImage
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primary text-bg font-medium text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
