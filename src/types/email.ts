export interface ICoursePurchased {
  userName: string;
  courseTitle: string;
  courseFinalPrice: number;
  orderId: string;
  purchaseDate: string;
  courseOriginalPrice: number;
  discount: number;
  courseUrl: string;
}

export interface IEmailOptions<
  T = { otpCode: number; name: string } | ICoursePurchased
> {
  to: string;
  subject: string;
  template: string;
  context: T;
}
