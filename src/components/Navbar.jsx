/* eslint-disable no-unused-vars */
import React from "react";

function Navbar() {
  return (
    <nav className=" bg-slate-800 text-white ">
      <div className="mycontainer flex px-4 py-4 justify-between items-center h-20">
        <div className="logo font-bold text-2xl">
         
          <span className="text-green-500 items-center"> &lt;</span>
          Pass
          <span className="text-green-500 items-center">OP/&gt;</span>
         
        </div>
        <button className="text-white bg-green-500 my-4 mx-2 ring-white ring-1 rounded-full flex justify-center items-center">
          <img className="invert w-10 p-1 px-1" src="public/github.png" alt="github logo"/>
           <span className="font-bold px-3 ">GitHub</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
