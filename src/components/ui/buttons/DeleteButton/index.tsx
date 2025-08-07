import cn from "@/utils/cn";
import React from "react";
import { BiTrash, BiTrashAlt } from "react-icons/bi";

type Props = {
  className?: string;
  isLoading?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const DeleteButton = ({ isLoading = false, className, ...props }: Props) => {
  return (
    <button
      disabled={isLoading}
      className={cn("bg-tomato-red disabled:bg-tomato-red/50 disabled:cursor-not-allowed p-1 rounded-md", className)}
      {...props}
    >
      <BiTrashAlt size={20} color="white" />
    </button>
  );
};

export default DeleteButton;
