import { useEffect, useRef, useState } from "react";
import "./styles.css";

const singleDigitRegex = /\d/;
const digitRegex = /\d+/;

export default function InputOtp({ length }) {
  const [code, setCode] = useState(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);

  const clampIndex = (index) => {
    if (index < 0) return 0;
    if (index >= length - 1) return length - 1;

    return index;
  };

  const onKeyDown = (event, index) => {
    switch (event.key) {
      case "ArrowLeft": {
        setFocusedIndex(clampIndex(focusedIndex - 1));
        break;
      }
      case "ArrowRight": {
        setFocusedIndex(clampIndex(focusedIndex + 1));
        break;
      }

      case "Backspace": {
        if (code[index]) {
          setCode(code.map((digit, idx) => (index === idx ? "" : digit)));
        } else if (index - 1 >= 0) {
          setCode(code.map((digit, idx) => (index - 1 === idx ? "" : digit)));
          setFocusedIndex(clampIndex(focusedIndex - 1));
        }
      }
      default: {
        const val = event.key;
        if (!singleDigitRegex.test(val)) {
          return;
        }

        setCode(code.map((digit, idx) => (index === idx ? event.key : digit)));
        setFocusedIndex(clampIndex(focusedIndex + 1));
        break;
      }
    }
  };

  const onPaste = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");

    if (!digitRegex.test(pastedText)) {
      return;
    }

    setCode(code.map((digit, index) => pastedText[index] ?? digit));
    setFocusedIndex(clampIndex(pastedText.length));
  };

  const isResetEnabled = code.some((digit) => Boolean(digit));
  const isSumbitEnabled = code.every((digit) => Boolean(digit));

  return (
    <div className="input-root">
      <div className="input-form-flex-container">
        {code.map((digit, index) => (
          <DigitInput
            key={index}
            value={digit}
            isFocused={focusedIndex === index}
            onFocus={() => setFocusedIndex(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            onPaste={onPaste}
          />
        ))}
      </div>
      <div className="input-form-flex-container">
        <button
          disabled={!isResetEnabled}
          onClick={() => {
            setCode(Array(length).fill(""));
            setFocusedIndex(0);
          }}
        >
          Reset
        </button>
        <button
          disabled={!isSumbitEnabled}
          onClick={() => alert(`Input OTP is: ${code.join("")}`)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function DigitInput({ isFocused, ...props }) {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <input
      ref={inputRef}
      className="input-box"
      maxLength={1}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      {...props}
    />
  );
}
