import { ICombinedCourseSchema } from "@/schemas/course.schema";
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { ZodType } from "zod";

export type BaseProps = {
  children: ReactNode | string;
  className?: string;
} & HTMLAttributes<HTMLDivElement | HTMLButtonElement>;

export type BaseButtonProps = {
  children: ReactNode | string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// =====| Form Step |===============

type FieldKeys = keyof ICombinedCourseSchema;

export type IFormStep = {
  title: string;
  position: number;
  validationSchema: ZodType<unknown>;
  component: React.ReactElement;
  fields: FieldKeys[];
};

