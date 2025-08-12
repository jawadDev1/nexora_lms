import { MessageCircle, Clock, VerifiedIcon } from "lucide-react";
import UserAvatar from "../UserAvatar";
import ReplyItem from "../ReplyItem";
import ReplyForm from "../ReplyForm";
import { IQuestion } from "@/modules/course/types";
import { formatNotificationTime } from "@/utils";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface QuestionItemProps {
  question: IQuestion;
  onReply: (questionId: string, reply: string) => Promise<void>;
  isSubmittingReply?: boolean;
}

const QuestionItem = ({
  question,
  onReply,
  isSubmittingReply = false,
}: QuestionItemProps) => {
  return (
    <div className="bg-card border border-light-gray/20 rounded-lg p-4 hover:border-light-gray/30 transition-colors">
      {/* Question Header */}
      <div className="flex gap-3 mb-3">
        <UserAvatar user={question.User} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-white flex items-center gap-x-1">
              {question.User?.name}
              {question.User?.role === "Admin" && (
                <RiVerifiedBadgeFill className="text-primary" size={18} />
              )}
            </span>
            <div className="flex items-center gap-1 text-light-gray text-xs">
              <Clock className="w-3 h-3" />
              {formatNotificationTime(`${question.created_at}`)}
            </div>
          </div>
          <p className="text-white/90 leading-relaxed">{question.question}</p>
        </div>
      </div>

      {/* Replies Section */}
      {question.replies.length > 0 && (
        <div className="ml-11 space-y-3 mb-3">
          <div className="flex items-center gap-2 text-light-gray text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>
              {question.replies.length}{" "}
              {question.replies.length === 1 ? "reply" : "replies"}
            </span>
          </div>
          {question.replies.map((reply, index) => (
            <ReplyItem key={index} reply={reply} />
          ))}
        </div>
      )}

      {/* Reply Form */}
      <div className="ml-11">
        <ReplyForm
          questionId={question.id}
          onSubmit={onReply}
          isSubmitting={isSubmittingReply}
        />
      </div>
    </div>
  );
};

export default QuestionItem;
