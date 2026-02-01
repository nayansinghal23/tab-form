import { Dispatch, SetStateAction } from "react";

import { IData } from "@/interface/interface";

interface IInterest {
  data: IData;
  setData: Dispatch<SetStateAction<IData>>;
}

const Interest = ({ data, setData }: IInterest) => {
  const { interest } = data;
  const interests = [
    { label: "Coding", value: "coding" },
    { label: "Cricket", value: "cricket" },
    { label: "Chess", value: "chess" },
  ];

  const toggleInterest = (value: string) => {
    if (interest.includes(value)) {
      setData((prevData) => ({
        ...prevData,
        interest: prevData.interest.filter((i: string) => i !== value),
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        interest: [...prevData.interest, value],
      }));
    }
  };

  return (
    <div className="py-2 flex flex-col gap-2">
      {interests.map(({ label, value }, index) => (
        <div className="flex items-center gap-2" key={index}>
          <input
            type="checkbox"
            checked={interest.includes(value)}
            className="hover:cursor-pointer"
            id={value}
            onChange={() => toggleInterest(value)}
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default Interest;
