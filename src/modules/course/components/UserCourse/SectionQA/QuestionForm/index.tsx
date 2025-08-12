"use client";
import React, { useState } from "react";
import { Send, Plus } from "lucide-react";

interface QuestionFormProps {
  onSubmit: (question: string) => Promise<void>;
  isSubmitting?: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const [question, setQuestion] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isSubmitting) return;

    await onSubmit(question);
    setQuestion("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <div className="mb-6">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 bg-card hover:bg-dark-brown border border-light-gray/20 rounded-lg flex items-center gap-3 text-left transition-all duration-200 group"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-bg" />
          </div>
          <span className="text-light-gray group-hover:text-white">
            Ask a question...
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-card border border-light-gray/20 rounded-lg p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-white mb-2"
          >
            Your Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to know?"
            className="w-full p-3 bg-bg border border-light-gray/30 rounded-lg text-white placeholder-light-gray focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
            rows={3}
            required
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setQuestion("");
            }}
            className="px-4 py-2 text-light-gray hover:text-white transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!question.trim() || isSubmitting}
            className="px-4 py-2 bg-primary text-bg font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isSubmitting ? "Posting..." : "Post Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
