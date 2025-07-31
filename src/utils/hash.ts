import bcrypt from "bcrypt";

export const comparePassword = async (
  origianlPassword: string,
  newPassword: string
) => {
  return await bcrypt.compare(origianlPassword, newPassword);
};

export const hashPassword = async (password: string) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};
