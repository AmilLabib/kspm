import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="h-[80%] flex items-center justify-center p-0 bg-white">
      <div className="flex flex-col md:flex-row w-full h-[80vh] px-8 md:px-16 items-center">
        {/* Left Side - Text */}
        <div className="order-2 md:order-1 md:ml-40 flex flex-col justify-center items-center lg:items-start h-full">
          <h3 className="text-lg lg:text-xl text-[#252B42] font-bold">
            KSPM PKN STAN
          </h3>
          <h1 className="text-3xl lg:text-5xl mb-2 text-[#252B42] font-bold">
            Rumah Riset
          </h1>
          <p className="text-lg lg:text-xl text-[#737373] text-center lg:text-left">
            Divisi Riset Kelompok Studi Pasar Modal (KSPM)
          </p>
          <p className="hidden lg:block lg:text-xl text-[#737373]">PKN STAN</p>
        </div>
        {/* Right Side - GIF */}
        <div className="order-1 md:order-2 flex justify-center items-center h-1/2 lg:h-full">
          <div className="mt-14 lg:mt-0 max-w-screen lg:w-[750px] lg:h-[500px] lg:max-w-full max-h-full overflow-hidden flex items-center justify-center">
            <img
              src="/house.gif"
              alt="Hero Animation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
