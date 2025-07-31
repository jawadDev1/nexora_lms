export interface IEmailOptions<T = Record<string, any>> {
  to: string;
  subject: string;
  template: string;
  context: T;
}
