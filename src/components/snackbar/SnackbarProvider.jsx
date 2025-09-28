import { createContext, useState, useContext, useRef } from "react";
import SnackBar from "./SnackBar";

const SnackBarContext = createContext(null);

export function SnackBarProvider({ children, maxSnack = 3 }) {
  const [snackBarItems, setSnackBarItems] = useState([]);
  const nextIdRef = useRef(0);
  const nextId = () => ++nextIdRef.current;

  const snackBar = ({ text, dismissTimeout }) => {
    if (!text) return;
    setSnackBarItems((prev) => {
      const newItem = { id: nextId(), text, dismissTimeout };
      const next = [newItem, ...prev];

      if (next.length > maxSnack) {
        next.pop(); // remove the oldest (last one in the array)
      }
      return next;
    });
  };

  const onClose = (id) => {
    setSnackBarItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SnackBarContext.Provider value={{ snackBar }}>
      {snackBarItems.map((snackBar, index) => (
        <SnackBar
          key={snackBar.id}
          index={index}
          onClose={() => onClose(snackBar.id)}
          {...snackBar}
        />
      ))}
      {children}
    </SnackBarContext.Provider>
  );
}

export const useSnackBar = () => {
  const snackBarContext = useContext(SnackBarContext);

  if (!snackBarContext)
    throw new Error("Snackbar should be used inside the context");

  return snackBarContext;
};
