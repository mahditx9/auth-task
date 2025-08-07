"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";
import { FC } from "react";
import styles from "./button.module.scss";

type ButtonVariants =
  | "success"
  | "destructive"
  | "info"
  | "regular"
  | "warn"
  | "default";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps extends PropsWithChildren {
  variants?: ButtonVariants;
  buttonType?: ButtonType;
  link?: {
    href: string;
    target?: "_blank" | "_parent" | "_self" | "_top";
  };
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const variantClasses: Record<ButtonVariants, string> = {
  destructive: styles.destructive,
  success: styles.success,
  info: styles.info,
  warn: styles.warn,
  regular: styles.regular,
  default: "",
};

export const Button: FC<ButtonProps> = ({
  children,
  variants = "regular",
  buttonType = "button",
  link,
  disabled = false,
  className,
  onClick,
}) => {
  const baseClass = styles.button;
  const variantClass = variantClasses[variants];
  const combinedClass = [
    baseClass,
    variantClass,
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (link?.href) {
    return (
      <Link
        href={link?.href || "#"}
        className={combinedClass}
        onClick={onClick}
        target={link?.target}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClass}
      onClick={onClick}
      disabled={disabled}
      type={buttonType}
    >
      {children}
    </button>
  );
};
