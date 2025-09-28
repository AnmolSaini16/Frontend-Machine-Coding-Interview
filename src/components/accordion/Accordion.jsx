import { createContext, useContext, useRef, useState } from "react";
import "./Accordion.css";
import { clsx } from "../utils";

const AccordionContext = createContext(null);

function useAccordainContext() {
  const context = useContext(AccordionContext);

  if (!context)
    throw new Error("Accordion components should be used inside Accordion");

  return context;
}

function Accordion({ children, defaultExapnded, className, ...props }) {
  const [open, setOpen] = useState(defaultExapnded);
  const panelId = useRef(
    `panel-${Math.random().toString(32).slice(2)}`
  ).current;
  const headerId = useRef(
    `header-${Math.random().toString(32).slice(2)}`
  ).current;

  return (
    <div {...props} className={clsx(["accordion", className])}>
      <AccordionContext.Provider value={{ open, setOpen, headerId, panelId }}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
}

function AccordionTitle({ children, className, ...props }) {
  const { open, setOpen, panelId, headerId } = useAccordainContext();

  return (
    <h3 {...props} className={clsx(["accordion-title", className])}>
      <button
        onClick={() => setOpen(!open)}
        className={clsx(["accordion-button", open && "accordion-button--open"])}
        aria-expanded={open}
        aria-controls={panelId}
        id={headerId}
      >
        {children}
        <span
          className={clsx(["accordion-icon", open && "accordion-icon--open"])}
          aria-hidden={true}
        >
          ⬇️
        </span>
      </button>
    </h3>
  );
}

function AccordionContent({ children, className, ...props }) {
  const { open, panelId, headerId } = useAccordainContext();
  return (
    <div
      {...props}
      hidden={!open}
      className={clsx(["accordion-content", className])}
      id={panelId}
      aria-labelledby={headerId}
      role="region"
    >
      {children}
    </div>
  );
}

export { Accordion, AccordionTitle, AccordionContent };
