import React from "react";
import { NikeSvg } from "../components/nike";
import test from "../components/test.jpeg";
const Page = () => {
  return (
    <section className="">
      <h1>Your Current Carts</h1>
      <div className="flex flex-col gap-4">
        <div className="w-full p-5 bg-slate-50 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:border hover:border-sky-500 overflow-hidden">
          <div className="grid grid-cols-5">
            <div className="flex flex-col items-center">
              <NikeSvg />
              <p className="text-xl">Nike</p>
              <div className="w-full border-t-2 border-gray-200 my-4" />
              <p className="text-lg text-slate-700">Items In Cart:</p>
              <p className="text-lg text-slate-700">Cart Total:</p>
            </div>
            <div className="flex flex-col col-span-3">
              <p className="text-xl text-slate-700 text-center">
                Your Current Nike Cart:
              </p>
              <div className="pl-20 pt-5 flex flex-row gap-5">
                <img className="w-1/5 h-auto rounded-xl" src={test.src} />
                <div className="h-full w-0.5 bg-gray-200" />
                <div>
                  <p className="text-lg text-slate-700">Air Jordan 1</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <button className="w-2/3 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full">
                Share Cart
              </button>
              <button className="w-2/3 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full">
                Edit Cart
              </button>
              <button className="w-2/3 bg-red-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full">
                {" "}
                Delete Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
