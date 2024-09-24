// src\components\Services\index.tsx
import SectionTitle from "../Common/SectionTitle";
import SingleService from "./SingleService";
import servicesData from "./serviceData";

const Services = () => {
  return (
    <>
      <section id="services" className="relative py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="الخدمات الرئيسية"
            paragraph="تتميز منصتنا بتقديم خدمات الصيانة لجميع الأجهزة الكهربائية والإلكترونية وأشهر تلك الخدمات "
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <SingleService key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* <div className="absolute bottom-0 left-0 right-0 z-[-1] opacity-30 h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div> */}
      </section>
    </>
  );
};

export default Services;
