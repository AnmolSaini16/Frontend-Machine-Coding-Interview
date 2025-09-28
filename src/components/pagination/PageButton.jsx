import { clsx } from "../utils";

export default function PageButton({
  children,
  className,
  onClick,
  active,
  ariaLabel,
  disabled,
}) {
  return (
    <button
      className={clsx([
        "pagination_button",
        active && "pagination_button--active",
        className,
      ])}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
