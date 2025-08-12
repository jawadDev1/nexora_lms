"use client";
import React, { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

interface ReplyFormProps {
  questionId: string;
  onSubmit: (questionId: string, reply: string) => Promise<void>;
  isSubmitting?: boolean;
}

const ReplyForm = ({
  questionId,
  onSubmit,
  isSubmitting = false,
}: ReplyFormProps) => {
  const [reply, setReply] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || isSubmitting) return;

    await onSubmit(questionId, reply);
    setReply("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="mt-3 flex items-center gap-2 text-light-gray hover:text-primary transition-colors text-sm"
      >
        <MessageCircle className="w-4 h-4" />
        Reply
      </button>
    );
  }

  return (
    <div className="mt-4 bg-bg/50 border border-light-gray/10 rounded-lg p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write your reply..."
          className="w-full p-3 bg-card border border-light-gray/30 rounded-lg text-white placeholder-light-gray focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none text-sm"
          rows={2}
          required
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setReply("");
            }}
            className="px-3 py-1.5 text-light-gray hover:text-white transition-colors text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!reply.trim() || isSubmitting}
            className="px-3 py-1.5 bg-primary text-bg font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors text-sm"
          >
            {isSubmitting ? (
              <div className="w-3 h-3 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
            ) : (
              <Send className="w-3 h-3" />
            )}
            {isSubmitting ? "Replying..." : "Reply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
