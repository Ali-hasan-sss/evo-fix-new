// src\components\Testimonials\SingleTestimonial.tsx
"use client"
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import Link from "next/link"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Stars from "../Stars";

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const { star, name, image, content, designation } = testimonial;

  let ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span key={index} className="text-yellow">
        {starIcon}
      </span>,
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-md relative h-full bg-white  p-8 shadow-two duration-300 hover:shadow-two dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
        <div className="mb-5 flex  items-center space-x-1">{ratingIcons}</div>
        <p className="mb-8   pb-8 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white">
          “{content}“
        </p>
        <div className="flex absolute border-t  border-body-color border-opacity-35 my-4 bottom-0  items-center">
        <Button className="bg-transparent py-8 rounded-none hover:opacity-50" onPress={onOpen}>
          {/* <div className="relative ml-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full"> */}
            <Image src={image} alt={name} width={40} height={40} className="ml-4"/>
          {/* </div> */}
          <div className="w-full">
            <h3 className="mb-1 text-lg font-semibold text-dark dark:text-white lg:text-base xl:text-lg">
              {name}
            </h3>
            <p className="text-sm text-body-color">{designation}</p>
          </div>
        </Button>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">فريق محمد</ModalHeader>
              <ModalBody>
              <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="desc-problem"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        تقييم الفريق
                      </label>
                      <Stars/>
                      {/* <textarea
                        name="desc-problem"
                        rows={5}
                        placeholder="اكتب هنا ..."
                        className="border-stroke w-full resize-none rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea> */}
                    </div>
                  </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  إلغاء
                </Button>
                <Button color="primary" onPress={onClose}>
                  تقييم
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </div>
    </div>
  );
};

export default SingleTestimonial;

