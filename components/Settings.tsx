import { Dispatch, SetStateAction } from "react";

import { IData } from "@/interface/interface";

interface ISettings {
  data: IData;
  setData: Dispatch<SetStateAction<IData>>;
}

const Settings = ({ data, setData }: ISettings) => {
  const { theme } = data;
  const themes = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  return (
    <div className="py-2 flex flex-col gap-2">
      {themes.map(({ label, value }, index) => (
        <div className="flex items-center gap-2" key={index}>
          <input
            type="radio"
            id={value}
            checked={theme === value}
            className="hover:cursor-pointer"
            onChange={() =>
              setData((prevData) => ({
                ...prevData,
                theme: value === "light" ? "light" : "dark",
              }))
            }
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default Settings;
