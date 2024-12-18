// src\components\Services\SingleService.tsx
import { Service } from "@/types/service";

const SingleService = ({ service }: { service: Service }) => {
  const { icon, title, paragraph } = service;
  return (
    <div className="w-full">
      <div className="wow  fadeInUp h-full rounded-md bg-white  p-8 shadow-two duration-300 hover:shadow-two dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8" data-wow-delay=".15s">
        <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px]  text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleService;
