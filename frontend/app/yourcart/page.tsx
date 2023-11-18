import React from "react";

const Page = () => {
  return (
    <section className="">
      <h1>yourCart</h1>
      <div className="columns-2xs">
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
      </div>
    </section>
  );
};

export default Page;
