import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center text-center">
      <div className="flex flex-col gap-4">
        <p className="font-bold text-3xl"> IT'S TIME TO GET </p>
        <h1 className="font-extrabold text-5xl sm:text-6xl md:text-6xl lg:tex-7xl">
          BIG & <span className="text-blue-400 font-medium">STRONG</span>
        </h1>
      </div>

      <p className="text-sm md:text-base font-light text-balance">
        I hereby acknowledgement that i may become{" "}
        <span className="text-blue-400 font-medium">
          unbelievably swolenormous
        </span>{" "}
        and accept all risks of becoming the local{" "}
        <span className="text-blue-400 font-medium">MOGGER</span> , afllicted
        with severe body dismorphia and unable to fit through doors and small
        cars
      </p>
      <button className="px-8 py-4 rounded-md border-[2px] bg-slate-800 border-blue-400 border-solid blueShadow duration-200">
        <p> Accept & Begin</p>
      </button>
    </div>
  );
};

export default Hero;
