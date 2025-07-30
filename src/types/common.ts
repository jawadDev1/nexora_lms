import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type BaseProps = {
  children: ReactNode | string;
  className?: string;
} & HTMLAttributes<HTMLDivElement | HTMLButtonElement>;

export type BaseButtonProps = {
  children: ReactNode | string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
