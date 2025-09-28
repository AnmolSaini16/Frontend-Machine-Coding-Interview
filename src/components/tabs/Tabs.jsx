import { clsx } from "../utils";
import "./Tabs.css";

function getTabPanelId(id) {
  return `tabpanel-${id}`;
}

function getTabId(id) {
  return `tab-${id}`;
}

function Tabs({
  value,
  onChange,
  tabs,
  orintation = "horizontal",
  className = "",
  ...props
}) {
  const SetValueAndFocus = (newIndex) => {
    onChange(newIndex);
    document.getElementById(getTabId(newIndex)).focus();
  };

  const onKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft": {
        SetValueAndFocus((value - 1 + tabs.length) % tabs.length);
        break;
      }

      case "ArrowRight": {
        SetValueAndFocus((value + 1) % tabs.length);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <div
      {...props}
      className={clsx(["tabs", `tabs-${orintation}`, className])}
      role="tablist"
      onKeyDown={onKeyDown}
    >
      {tabs.map((tab, index) => {
        const active = value === index;
        return (
          <button
            id={getTabId(index)}
            key={index}
            className={clsx(["tab", active && "tab--active"])}
            onClick={() => onChange(index)}
            role="tab"
            aria-selected={active}
            aria-controls={getTabPanelId(index)}
            tabIndex={active ? 0 : -1}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function TabPanel({ children, value, index, ...props }) {
  return (
    <div
      {...props}
      id={getTabPanelId(index)}
      hidden={value !== index}
      role="tabpanel"
      className="tab-panel"
      aria-labelledby={getTabId(index)}
    >
      {children}
    </div>
  );
}

export { Tabs, TabPanel };
