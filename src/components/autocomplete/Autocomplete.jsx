import { useMemo } from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { clsx } from "../utils";

import "./Autocomplete.css";

export default function AutoComplete({
  options = [],
  placeholder,
  value,
  onChange,
  className = "",
  defaultValue = "",
  disabled = false,
}) {
  const rootRef = useRef(null);
  const inputRef = useRef();
  const listRef = useRef();
  const listboxId = useRef(`ac-${Math.random().toString(32).slice(2)}`).current;

  const isControlled = value !== undefined && typeof onChange === "function";
  const [innerValue, setInnerValue] = useState(defaultValue);
  const text = isControlled ? value : innerValue;
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (isControlled) {
      setInnerValue(value ?? "");
    }
  }, [isControlled, value]);

  useEffect(() => {
    function handleMouseDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const el = document.getElementById(`${listboxId}-opt-${activeIndex}`);
    if (el && listRef.current) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open, listboxId]);

  const setText = (value) => {
    if (isControlled) onChange(value);
    setInnerValue(value);
  };

  const onInputChange = (e) => {
    const text = e.target.value;
    setOpen(true);
    setQuery(text);
    setText(text);
  };

  const onOptionClick = (option) => {
    const exists = options.some((opt) => opt === option);
    if (!exists) return;

    setActiveIndex(-1);
    setText(option);
    setQuery("");
    setOpen(false);
    inputRef.current.focus();
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      setActiveIndex(0);
      return;
    }
    switch (e.key) {
      case "ArrowDown": {
        if (filteredOptions.length === 0) return;
        setActiveIndex((i) => (i + 1) % filteredOptions.length);
        break;
      }

      case "ArrowUp": {
        if (filteredOptions.length === 0) return;
        setActiveIndex(
          (i) => (i - 1 + filteredOptions.length) % filteredOptions.length
        );
        break;
      }
      case "Enter": {
        if (open && activeIndex >= 0 && activeIndex < filteredOptions.length) {
          onOptionClick(filteredOptions[activeIndex]);
        }
        break;
      }

      case "Escape": {
        setOpen(false);
        setActiveIndex(-1);
        break;
      }
    }
  };

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <div className={clsx(["ac-root", className])} ref={rootRef}>
      <div className="ac-inputWrapper">
        <input
          ref={inputRef}
          placeholder={placeholder}
          className="ac-input"
          type="text"
          onClick={() => setOpen(true)}
          value={text}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
        />
        <button
          className="ac-clearBtn"
          disabled={disabled || !text}
          onClick={() => {
            setText("");
            setQuery("");
            setActiveIndex(-1);
            setOpen(true);
            inputRef.current.focus();
          }}
        >
          ×
        </button>
      </div>

      {open && (
        <ul
          className="ac-listbox"
          tabIndex={-1}
          id={listboxId}
          role="listbox"
          ref={listRef}
        >
          {filteredOptions.length === 0 ? (
            <li aria-disabled className="ac-option ac-empty">
              No Options
            </li>
          ) : (
            filteredOptions.map((opt, idx) => {
              const isActive = idx === activeIndex;
              const isSelected = text === opt;
              return (
                <li
                  id={`${listboxId}-opt-${idx}`}
                  className={clsx([
                    "ac-option",
                    isActive && "ac-option--active",
                    isSelected && "ac-option--selected",
                  ])}
                  key={`${opt},${idx}`}
                  onClick={() => onOptionClick(opt)}
                  aria-selected={isSelected || isActive}
                >
                  {opt}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
