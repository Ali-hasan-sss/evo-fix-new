// src\components\Status\index.tsx
import React from "react";

const Status = () => {
  return (
    <div>
      <article className=" mx-auto flex max-w-[300px] p-8 flex-col gap-4 rounded rounded-lg border border-gray-100 bg-white  text-black dark:text-white shadow-three dark:bg-dark ">
        <div className="e inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600 sm:text-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>

          <span className="text-xs font-medium"> 67.81% </span>
        </div>

        <div>
          <strong className="block text-sm font-medium ">
            {" "}
            Profit{" "}
          </strong>

          <p>
            <span className="text-2xl font-medium ">
              {" "}
              $404.32{" "}
            </span>

            <span className="text-xs "> from $240.94 </span>
          </p>
        </div>
      </article>
      {/* 
<article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
  <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
    </svg>

    <span className="text-xs font-medium"> 67.81% </span>
  </div>

  <div>
    <strong className="block text-sm font-medium text-gray-500"> Profit </strong>

    <p>
      <span className="text-2xl font-medium text-gray-900"> $240.94 </span>

      <span className="text-xs text-gray-500"> from $404.32 </span>
    </p>
  </div>
</article> */}
    </div>
  );
};

export default Status;
