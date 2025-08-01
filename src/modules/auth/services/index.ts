import { db } from "@/lib/db";
import { IGoogleSignup, ISignup } from "../types";
import { validateNoNulls } from "@/utils/service";
import { generateActivationCode } from "@/utils";
import sendMail from "@/lib/email";
import { asyncHandler } from "@/utils/asyncHandler";
import { hashPassword } from "@/utils/hash";

export const Signup = asyncHandler(async (body: ISignup) => {
  validateNoNulls(body);

  const { name, email, password, avatar } = body;
  const userExists = await db.user.findFirst({
    where: { email },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const otp = generateActivationCode();

  const otp_expiry = new Date(Date.now() + 5 * 60 * 1000);

  const user = await db.user.create({
    data: { name, email, password: hashedPassword, avatar, otp, otp_expiry },
    omit: { password: true },
  });

  await sendMail({
    to: user.email,
    subject: "Verify Email",
    template: "verify-email",
    context: { name: user.name, otpCode: otp },
  });

  return {
    success: true,
    message: "Signed up successfull",
    data: user,
  };
});

export const GoogleSignup = asyncHandler(async (body: IGoogleSignup) => {
  validateNoNulls(body);

  const { name, email, avatar } = body;
  const userExists = await db.user.findFirst({
    where: { email },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await db.user.create({
    data: { name, email, password: "", avatar, verified: true },
    omit: { password: true },
  });

  return {
    success: true,
    message: "Signed up successfull",
    data: user,
  };
});

export const VerifyEmail = asyncHandler(async (otp: string) => {
  if (isNaN(Number(otp))) throw new Error("Otp must be a number");

  const iotp = Number(otp);

  const now = new Date();

  const user = await db.user.findFirst({
    where: {
      otp: iotp,
      otp_expiry: {
        gt: now,
      },
    },
  });

  if (!user) {
    throw new Error("Otp is Expired");
  }

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      verified: true,
      otp: null,
      otp_expiry: null,
    },
  });

  return {
    success: true,
    message: "account verified successfully",
    data: updatedUser,
  };
});

export const getLoginUser = asyncHandler(
  async ({ email }: { email: string }) => {
    console.log("runned =======>")
    const user = await db.user.findFirst({
      where: { email },
    });

    console.log("user =======> ", email, user);
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    return { success: true, message: "user fetched successfully", data: user };
  }
);

export const updateUserDetails = asyncHandler(async (body) => {
  validateNoNulls(body);
});

export const resendEmail = asyncHandler(
  async ({ email }: { email: string }) => {
    const user = await db.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("User does not exists");
    }

    const otp = generateActivationCode();

    const otp_expiry = new Date(Date.now() + 5 * 60 * 1000);

    const updatedUser = await db.user.update({
      where: { email },
      data: { otp, otp_expiry },
    });

    await sendMail({
      to: user.email,
      subject: "Verify Email",
      template: "verify-email",
      context: { name: user.name, otpCode: otp },
    });

    return {
      success: true,
      message: "Email send  successfull",
      data: updatedUser,
    };
  }
);
