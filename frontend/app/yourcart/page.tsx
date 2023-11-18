import React from "react";

const Page = () => {
  return (
    <section className="">
      <h1>yourCart</h1>
      <div className="grid grid-cols-3 gap-4">
        <div
          className="w-fit p-5
         bg-slate-50 rounded-xl shadow-lg items-center transform transition duration-500 hover:scale-105 hover:border hover:border-sky-500 overflow-hidden"
        >
          <div> COMPANY LOGO </div>
        </div>
        <div className="w-full p-5  bg-slate-50 rounded-xl shadow-lg items-center transform transition duration-500 hover:scale-105 hover:border hover:border-sky-500 overflow-hidden">
          <p>Your Cart </p>
          <p>Number Of Items: </p>
          <p>Total:</p>
          <button>View Cart</button>
        </div>
        <div className="flex flex-col gap-5 pad-y-10">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Share Cart
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            View Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
