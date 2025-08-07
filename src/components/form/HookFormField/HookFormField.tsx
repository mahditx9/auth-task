import { FC, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa6";
import styles from "./HookFormField.module.scss";

interface HookFormFieldProps {
  name: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  variant?: "default" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

export const HookFormField: FC<HookFormFieldProps> = ({
  name,
  value,
  onChange,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
  icon,
  variant = "default",
  size = "md",
}) => {
  const { control } = useFormContext();

  return (
    <div className={`${styles.box} ${disabled ? styles.disabled : ""}`}>
      {label && (
        <label
          className={`${styles.label} ${required ? styles.requiredLabel : ""}`}
          htmlFor={name}
        >
          {required && <FaStarOfLife className={styles.requiredIcon} />}
          {label}
        </label>
      )}

      <div className={styles.fieldWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <div className={styles.inputWrapper}>
          {onChange && value !== undefined ? (
            <input
              type={type}
              id={name}
              placeholder={placeholder}
              value={value ?? ""}
              onChange={(e) =>
                onChange?.(type === "number" ? +e.target.value : e.target.value)
              }
              disabled={disabled}
              className={[
                styles.input,
                styles[variant],
                styles[size],
                disabled ? styles.inputDisabled : "",
              ].join(" ")}
            />
          ) : (
            <Controller
              name={name}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className={styles.inputWrapper}>
                  <input
                    {...field}
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={[
                      styles.input,
                      styles[variant],
                      styles[size],
                      disabled ? styles.inputDisabled : "",
                    ].join(" ")}
                  />
                  {error && (
                    <span className={styles.error}>{error.message}</span>
                  )}
                </div>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};
