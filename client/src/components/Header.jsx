import React from "react";

const Header = () => {
  return (
    <header className="w-full flex flex-col items-center pb-4 mt-4">
      <div className="container px-4 md:px-6 py-4 md:py-6 flex justify-center items-center">
        <h1 className="container-logo text-center">
          <a href="/" className="inline-block">
            <span className="logo text-3xl md:text-4xl font-bold text-blue-400 bt-0">เที่ยวไหนดี</span>
          </a>
        </h1>
      </div>
      
      
      <div className="container px-4 md:px-6 w-full max-w-5xl mt-6">
        <div className="flex flex-col w-full gap-2">
          <div className="text-gray-700 text-sm md:text-base">ค้นหาที่เที่ยว</div>
          <div className="w-full">
            <input 
              type="text" 
              placeholder="หาที่เที่ยวแล้วไปกัน ..." 
              className="w-full outline-none text-gray-500 text-sm md:text-base placeholder-gray-400 pb-1 border-b border-gray-300 text-center"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 