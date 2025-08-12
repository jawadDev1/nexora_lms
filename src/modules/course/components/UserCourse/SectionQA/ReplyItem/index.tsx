import { IReply } from "@/modules/course/types";
import UserAvatar from "../UserAvatar";
import { formatNotificationTime } from "@/utils";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface ReplyItemProps {
  reply: IReply;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply }) => {
  return (
    <div className="flex gap-3 p-3 bg-bg/30 rounded-lg border-l-2 border-primary/20">
      <UserAvatar user={reply.User} size="sm" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium flex items-center gap-x-1 text-white">
            {reply.User?.name || "Anonymous"}
            {reply.User?.role === "Admin" && (
              <RiVerifiedBadgeFill className="text-primary" size={18} />
            )}
          </span>
          <span className="text-xs text-light-gray">
            {formatNotificationTime(`${reply.created_at}`)}
          </span>
        </div>
        <p className="text-sm text-white/90 leading-relaxed">{reply.reply}</p>
      </div>
    </div>
  );
};

export default ReplyItem;
