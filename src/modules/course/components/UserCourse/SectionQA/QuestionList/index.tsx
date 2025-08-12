import React from "react";
import { HelpCircle } from "lucide-react";
import QuestionItem from "../QuestionItem";
import { IQuestion } from "@/modules/course/types";

interface QuestionsListProps {
  questions: IQuestion[];
  onReply: (questionId: string, reply: string) => Promise<void>;
  isSubmittingReply?: boolean;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  onReply,
  isSubmittingReply = false,
}) => {

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-light-gray/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-light-gray" />
        </div>
        <p className="text-light-gray text-lg mb-2">No questions yet</p>
        <p className="text-light-gray/70 text-sm">
          Be the first to ask a question about this section!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionItem
          key={index}
          question={question}
          onReply={onReply}
          isSubmittingReply={isSubmittingReply}
        />
      ))}
    </div>
  );
};

export default QuestionsList;
