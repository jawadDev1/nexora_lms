export interface IEmailOptions<T = { otpCode: number; name: string }> {
  to: string;
  subject: string;
  template: string;
  context: T;
}
