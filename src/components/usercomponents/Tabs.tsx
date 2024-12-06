import React, { useContext } from "react";

interface Tab {
  label: string;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div>
      {/* Select Dropdown for Mobile */}
      <div className="mb-2 w-full p-2 sm:hidden">
        <select value={activeTab} onChange={(e) => onTabChange(e.target.value)}>
          {tabs.map((tab) => (
            <option key={tab.key} value={tab.key}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs for Desktop */}
      <div className="mb-4 hidden  w-full sm:flex">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => onTabChange(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
