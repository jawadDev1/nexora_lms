"use client";
import {
  CREATE_QUESTION,
  GET_QUESTIONS,
  REPLY_QUESTION,
} from "@/modules/course/actions";
import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionsList from "./QuestionList";
import { notifyError } from "@/utils/toast";
import { IQuestion } from "@/modules/course/types";

export interface SectionQAProps {
  sectionId: string;
}

const SectionQA = ({ sectionId }: SectionQAProps) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const getQuestions = async () => {
    const result = await GET_QUESTIONS({ content_id: sectionId });
    if (!result.success || !result.data) {
      return;
    }
    setQuestions(result.data);
  };

  const handleQuestionSubmit = async (question: string) => {
    setIsSubmittingQuestion(true);
    const result = await CREATE_QUESTION({ content_id: sectionId, question });

    setIsSubmittingQuestion(false);
    if (!result.success) {
      notifyError(result.message);
      return;
    }

    await getQuestions();
  };

  const handleReplySubmit = async (questionId: string, reply: string) => {
    setIsSubmittingReply(true);
    const result = await REPLY_QUESTION({ question_id: questionId, reply });

    setIsSubmittingReply(false);
    if (!result.success) {
      notifyError(result.message);
      return;
    }

    await getQuestions();
  };

  useEffect(() => {
    getQuestions();
  }, [sectionId]);

  return (
    <div className="max-w-4xl mx-auto  pb-6 bg-bg ">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Questions & Answers
        </h2>
        <p className="text-light-gray">
          Ask questions and help your fellow students
        </p>
      </div>

      <QuestionForm
        onSubmit={handleQuestionSubmit}
        isSubmitting={isSubmittingQuestion}
      />

      <QuestionsList
        questions={questions}
        onReply={handleReplySubmit}
        isSubmittingReply={isSubmittingReply}
      />
    </div>
  );
};

export default SectionQA;
