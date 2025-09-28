import { useRef } from "react";
import { clsx } from "../utils";
import "./Modal.css";
import {
  useClickOutside,
  useFocusOnModalElements,
  useFocusTrap,
  useOnKeyDown,
  useReturnFocus,
} from "./utils";
import { createPortal } from "react-dom";

const sizeMap = {
  sm: "modal-size-sm",
  md: "modal-size-md",
};

const titleId = Math.random().toString(32).slice(2);
const contentId = Math.random().toString(32).slice(2);

const Modal = ({ open, ...props }) => {
  if (!open) return null;

  return <ModelImpl {...props} />;
};

const ModelImpl = ({ onClose, children, className = "", size = "" }) => {
  const modalRef = useRef(null);

  // closing hooks
  useClickOutside(modalRef, onClose);
  useOnKeyDown("Escape", onClose);

  // focusing hooks
  useReturnFocus();
  useFocusOnModalElements(modalRef);
  useFocusTrap(modalRef);

  const sizeClass = sizeMap[size];

  const modal = () => {
    return (
      <div className="modal-overlay">
        <div
          className={clsx(["modal", sizeClass, className])}
          ref={modalRef}
          aria-modal="true"
          role="dialog"
          aria-labelledby={"dialog-title-" + titleId}
          aria-describedby={"dialog-content-" + contentId}
        >
          {children}
        </div>
      </div>
    );
  };
  return createPortal(modal(), document.body);
};

const ModalHeader = ({ children }) => {
  return <h1 id={"dialog-title-" + titleId}>{children}</h1>;
};

const ModalContent = ({ children }) => {
  return (
    <div className="modal-content" id={"dialog-content-" + contentId}>
      {children}
    </div>
  );
};

const ModalFooter = ({ children }) => {
  return <div className="modal-footer">{children}</div>;
};

export { Modal, ModalHeader, ModalContent, ModalFooter };
