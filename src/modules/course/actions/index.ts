"use server";

import {
  createOrder,
  createQuestion,
  getContentQuestions,
  processPayment,
  replyQuestion,
} from "../services";
import { ICreateQuestion, IGetQuestionsReturn, IReplyQuestion } from "../types";

export const PROCESS_PAYMENT = async ({
  amount,
}: {
  amount: number;
}): Promise<{
  success: boolean;
  message: string;
  data: { client_secret: string | null } | null;
}> => {
  try {
    const res = await processPayment({ amount });

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};

export const CREATE_ORDER = async (payload: {
  paymentId: string;
  courseId: string;
}): Promise<{
  success: boolean;
  message: string;
  data?: null;
}> => {
  try {
    const res = await createOrder(payload);

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};

// ===== Question ======================================

export const CREATE_QUESTION = async (payload: ICreateQuestion) => {
  try {
    const res = await createQuestion(payload);

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};

export const GET_QUESTIONS = async ({
  content_id,
}: {
  content_id: string;
}): Promise<IGetQuestionsReturn> => {
  try {
    const res = await getContentQuestions({ content_id });

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};

export const REPLY_QUESTION = async (payload: IReplyQuestion) => {
  try {
    const res = await replyQuestion(payload);

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};
