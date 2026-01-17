import React from "react";
import styles from "./styles.module.css";

export interface ToggleProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  theme?: "light" | "dark";
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  variant = "primary",
  size = "medium",
  theme = "light",
  checked = false,
  onChange,
  disabled = false,
  className,
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const toggleClasses = [
    styles.toggle,
    styles[variant],
    styles[size],
    styles[theme],
    checked && styles.checked,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const thumbClasses = [styles.thumb, checked && styles.thumbChecked]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={toggleClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className={thumbClasses} />
    </button>
  );
};

export default Toggle;



















