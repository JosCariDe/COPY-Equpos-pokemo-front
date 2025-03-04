"use client";

import Carousel from "@/components/carrusel";

const Page = () => {
  const images = ["/57.png", "/9.png","/logoPoke.jpg","/6.svg"];

  return (
    <div className="overflow-hidden">
      <Carousel images={images} />
    </div>
  );
};

export default Page;
