import { useEffect, useRef } from "react";

export const useClickOutside = (modalRef, onClose) => {
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        e.target instanceof Node &&
        modalRef.current &&
        !modalRef.current?.contains(e.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
};
export const useOnKeyDown = (key, callback) => {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === key) {
        callback(e);
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
};

export const useReturnFocus = () => {
  const triggerElementRef = useRef(null);

  useEffect(() => {
    triggerElementRef.current = document.activeElement;

    return () => {
      if (triggerElementRef.current instanceof HTMLElement) {
        triggerElementRef.current.focus();
      }
    };
  }, []);
};

const getTabbableElements = (modalRef) => {
  if (modalRef.current === null) return [];

  return modalRef.current.querySelectorAll("button, input, textarea, [href]");
};

export const useFocusOnModalElements = (modalRef) => {
  useEffect(() => {
    const tabbableElements = getTabbableElements(modalRef);
    const firstEle = tabbableElements[0];
    if (firstEle instanceof HTMLElement) firstEle.focus();
  }, []);
};

export const useFocusTrap = (modalRef) => {
  function trapFocus(event) {
    if (!modalRef.current) return null;

    const tabbableElements = getTabbableElements(modalRef);

    const firstEle = tabbableElements[0];
    const lastEle = tabbableElements[tabbableElements.length - 1];

    if (event.shiftKey) {
      // shift + tab
      if (
        document.activeElement === firstEle &&
        lastEle instanceof HTMLElement
      ) {
        event.preventDefault();
        lastEle.focus();
      }
    } else {
      // tab key
      if (
        document.activeElement === lastEle &&
        firstEle instanceof HTMLElement
      ) {
        event.preventDefault();
        firstEle.focus();
      }
    }
  }

  useOnKeyDown("Tab", trapFocus);
};
