export interface IHokageUserTable {
  name: string;
  id: string;
  email: string;
  created_at: Date;
  _count: { enrollments: number };
  enrollments: number;
}

export type IHokageUserTableReturn = Promise<{
  success: boolean;
  message: string;
  data: IHokageUserTable[];
}>;
