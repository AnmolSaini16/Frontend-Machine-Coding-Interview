import { useEffect } from "react";
import "./snackBar.css";

const DEFAULT_DISMISS_TIME = 2000;

export default function SnackBar({ text, onClose, index, dismissTimeout }) {
  useEffect(() => {
    const timer = setTimeout(onClose, dismissTimeout ?? DEFAULT_DISMISS_TIME);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="snackbar"
      style={{ transform: `translateY(${index * 50}px)` }}
    >
      <p>{text}</p>
      <button onClick={onClose}>×</button>
    </div>
  );
}
