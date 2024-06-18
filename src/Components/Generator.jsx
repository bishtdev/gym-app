import React from "react";
import SectionWrapper from "./SectionWrapper";
import Header from "./Header";



export default function Generator() {
  return (
    <SectionWrapper
      header={"generate Your workout"}
      title={["It's", "Huge", "O'Clock"]}
    >
      <Header
        index={"01"}
        title={"pick your poison"}
        description={"select your workout"}
      />
    </SectionWrapper>
  );
}
