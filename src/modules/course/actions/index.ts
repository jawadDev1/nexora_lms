"use server";

import { createOrder, processPayment } from "../services";

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
