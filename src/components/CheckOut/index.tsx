// src\components\CheckOut\index.tsx
import Image from "next/image";

const CheckOut = () => {
  return (
    <>
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
              <div
                className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s
              "
              >
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  الدفع الإلكتروني
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  عند إتمام عملية الدفع سيتم إعادة تسليم القطعة
                </p>
                <form>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-full">
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="mb-7 flex items-center">
                          <input
                            type="radio"
                            className="h-5 w-5 cursor-pointer"
                            name="checkOut"
                            id="syriatel-cash"
                          />
                          <label
                            htmlFor="syriatel-cash"
                            className="mr-4 flex cursor-pointer gap-2"
                          >
                            <Image
                              src="/images/checkout/syriaTelCach.png"
                              alt="syriatel-cash"
                              width={60}
                              height={60}
                              className="rounded-md"
                              id="syriatel-cash"
                            />
                          </label>
                        </div>

                        <div className="mb-7 flex items-center">
                          <input
                            type="radio"
                            className="h-5 w-5 cursor-pointer"
                            name="checkOut"
                            id="MTN-cash"
                          />
                          <label
                            htmlFor="MTN-cash"
                            className="mr-4 flex cursor-pointer gap-2"
                          >
                            <Image
                              src="/images/checkout/mtn-cach.png"
                              alt="MTN-cash"
                              width={60}
                              height={60}
                              className="rounded-md"
                              id="MTN-cash"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="phoneNO"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          رقم الجوال
                        </label>
                        <input
                          name="phoneNO"
                          type="number"
                          placeholder="963+"
                          className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="IDnumber"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          الرقم الوطني / رقم جواز السفر
                        </label>
                        <input
                          name="IDnumber"
                          type="number"
                          placeholder=""
                          className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="amount"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          الكمية
                        </label>
                        <input
                          name="amount"
                          type="number"
                          placeholder="0 ل.س"
                          className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>

                    <div className="mt-8 w-full px-4 md:w-1/2">
                      <button className=" rounded-md bg-primary px-9 py-3 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                        <div className="flex">
                        دفع الرسوم
                        <span className="mr-4">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                            />
                          </svg>
                        </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOut;
