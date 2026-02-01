import { Dispatch, SetStateAction } from "react";

import { IData } from "@/interface/interface";

interface IProfile {
  data: IData;
  setData: Dispatch<SetStateAction<IData>>;
}

const Profile = ({ data, setData }: IProfile) => {
  const { name, email, age } = data;

  return (
    <div className="py-2 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          className="border border-black px-2 py-1 rounded-md"
          value={name}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, name: e.target.value }))
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <label>Email :</label>
        <input
          type="email"
          placeholder="Enter email"
          className="border border-black px-2 py-1 rounded-md"
          value={email}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <label>Age :</label>
        <input
          type="number"
          placeholder="Enter age"
          className="border border-black px-2 py-1 rounded-md"
          value={age ? age : ""}
          min={0}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              age: parseInt(e.target.value),
            }))
          }
        />
      </div>
    </div>
  );
};

export default Profile;
