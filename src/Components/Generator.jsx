import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { WORKOUTS } from "../utlis/swoldiers";
import { FaCaretDown } from "react-icons/fa";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base lg:text-2xl mx-auto">{description}</p>
    </div>
  );
}

export default function Generator() {
  const [toggle, setToggle] = useState("false");

  const handleToggle = () => {
    return !toggle;
  };

  const showModal = false;

  return (
    <SectionWrapper
      header="Generate Your Workout"
      title={["It's", "Huge", "O'Clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure"}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              className="bg-slate-950 border-2 border-blue-500 py-3 rounded-lg hover:border-blue-700"
              key={typeIndex}
            >
              <p className="font-bold  ">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Header
        index={"02"}
        title={"Lock on targets"}
        description={"Select Muscles for annihilation"}
      />
      <div className="bg-slate-950 p-3 border border-solid border-blue-400 rounded-lg">
        <button className="relative p-3 flex items-center justify-center">
          <p>Select muscle groups</p>
          <FaCaretDown className="absolute right-3 top-1/2 -translate-y-1/2 " />
        </button>
        {showModal && <div>modal</div>}
      </div>
    </SectionWrapper>
  );
}
