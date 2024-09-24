// src\components\Order\index.tsx
"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import CheckOut from "../CheckOut";
import { User } from "@prisma/client";
import { governorates } from "../Signup/data";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";
import { useEffect, useState } from "react";
import React from "react";




const Order = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [deviceType, setDeviceType] = useState("");
  const [phoneNO, setPhoneNO] = useState("");
  const [address, setAddress] = useState("");
  const [descProblem, setDescProblem] = useState("");
  const [technicalID, setTechnicalID] = useState<number | null>(null);
  const [governorate, setGovernorate] = useState("");

  const [technicians, setTechnicians] = useState<User[]>([]);

  // Fetch the data when the component is mounted
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/users/Technicals`);
        setTechnicians(response.data); // Store the fetched technicians in state
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching technicians",
        );
      }
    };

    fetchTechnicians();
  }, []);

  const onSelectionChange = (key: string) => {
    const selectedTechnicianID = parseInt(key, 10); // Convert the string key to number
  setTechnicalID(selectedTechnicianID);  
  };
  
  const onInputChange = (value: string) => {
    setGovernorate(value)
  };

  const requestMaintenanceSubmitHundler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deviceType === "") return toast.error("هناك حقل فارغ");
    if (descProblem === "") return toast.error("هناك حقل فارغ");
    if (governorate === "") return toast.error("هناك حقل فارغ");
    if (phoneNO === "") return toast.error("هناك حقل فارغ");
    if (address === "") return toast.error("هناك حقل فارغ");
    if (technicalID === null) return toast.error("هناك حقل فارغ");

    try {
      await axios.post(`${DOMAIN}/api/Maintenance_Requests/Add_Order`, {
        deviceType,
        phoneNO,
        address,
        descProblem,
        technicalID,
        governorate,
      });
      router.replace('/')
      router.refresh();
      toast.success("تم إرسال طلبك بنجاح");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  return (
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
                أطلب الآن
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                قم بتحديد المشكلة التي تواجهك وسيقوم الفريق المختص بتولي الأمر
              </p>
              <form onSubmit={requestMaintenanceSubmitHundler}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-full">
                    <div className="mb-8">
                      <label
                        htmlFor="address"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        العنوان بالكامل
                      </label>
                      <input
                        name="address"
                        type="text"
                        value={address}
                        onChange={e => {setAddress(e.target.value)}}
                        placeholder="مثال: دمشق - برامكة / سانا / جادة الاقتصاد / محضر .../ طابق أول"
                        className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="typeDevice"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        نوع الجهاز
                      </label>
                      <input
                        name="typeDevice"
                        type="text"
                        value={deviceType}
                        onChange={e => {setDeviceType(e.target.value)}}
                        placeholder="مثال: شاشة LG"
                        className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
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
                        value={phoneNO}
                        onChange={e => {setPhoneNO(e.target.value)}}
                        placeholder="مثال: 0999911111"
                        className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  <div className=" w-full px-4 md:w-1/2">
                    <div className=" w-full mb-8">
                      <label
                        htmlFor="governorate"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        المحافظة
                      </label>
                      <Autocomplete
                        name="governorate"
                        value={governorate}
                        onInputChange={onInputChange}

                        label="اختر المحافظة"
                        className="border-stroke w-full rounded-xl border bg-[#f8f8f8]  text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      >
                        {governorates.map((governorate) => (
                          <AutocompleteItem
                            key={governorate.id}
                            value={governorate.value}
                          >
                            {governorate.value}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>

                    <div className="  mb-8 w-full">
                      <label
                        htmlFor="Technicals"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        التقني
                      </label>
                      <Autocomplete
                        name="Technicals"
                        value={technicalID?.toString() || ""} // Convert number to string for Autocomplete value
                        onSelectionChange={onSelectionChange} // Pass handler
                        label="اختر التقني"
                        className=" border-stroke w-full rounded-xl border bg-[#f8f8f8]  text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      >
                        {technicians.map((technician) => (
                          <AutocompleteItem
                            key={technician.id}
                            value={technician.id.toString()} // Use ID as value, converted to string
                          >
                            {`${technician.fullName} | ${technician.governorate}`} 
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="desc-problem"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        تشخيص المشكلة
                      </label>
                      <textarea
                        name="desc-problem"
                        value={descProblem}
                        onChange={e => {setDescProblem(e.target.value)}}
                        rows={5}
                        placeholder="اكتب هنا ..."
                        className="border-stroke w-full resize-none rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      إرسال
                    </button>
                    {/* <Button onPress={onOpen} className="rounded-md bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      إرسال
                    </Button>

                    <Modal
                            backdrop="opaque" 
                           size="full"
                            isOpen={isOpen} 
                            onOpenChange={onOpenChange}
                            radius="lg"
                            classNames={{
                              body: "",
                              backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                              base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                              header: "border-b-[1px] border-[#292f46]",
                              footer: "border-t-[1px] border-[#292f46]",
                              closeButton: "hover:bg-white/5 active:bg-white/10",
                            }} 
                    >
                    <ModalContent  >
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            دفع رسوم الطلب
                          </ModalHeader>
                          <ModalBody>
                            <CheckOut/>
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
