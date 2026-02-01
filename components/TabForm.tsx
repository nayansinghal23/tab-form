"use client";

import { useState } from "react";

import Interest from "./Interest";
import Profile from "./Profile";
import Settings from "./Settings";

import { IData } from "@/interface/interface";

const TabForm = () => {
  const tabs = [
    { name: "Profile", component: Profile },
    { name: "Interest", component: Interest },
    { name: "Settings", component: Settings },
  ];
  const [activeTab, setActiveTab] = useState<number>(0);
  const [data, setData] = useState<IData>({
    name: "",
    age: 0,
    email: "",
    interest: [],
    theme: "dark",
  });

  const handleFormSubmit = async () => {
    try {
      // Validations
      localStorage.setItem("data", JSON.stringify(data));
      // API call
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <div className="flex items-center">
        {tabs.map(({ name }, index) => (
          <div
            key={index}
            className="border border-black px-2 hover:cursor-pointer"
            onClick={() => setActiveTab(index)}
          >
            <p>{name}</p>
          </div>
        ))}
      </div>
      {tabs[activeTab].component({ data, setData })}
      {activeTab === tabs.length - 1 && (
        <button
          className="px-2 border border-black rounded-md hover:cursor-pointer"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default TabForm;
