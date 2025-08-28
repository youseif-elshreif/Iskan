import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "@/components/ui/Card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ListingImageCarouselProps {
  images: string[];
  title: string;
}

const ListingImageCarousel: React.FC<ListingImageCarouselProps> = ({
  images,
  title,
}) => {
  return (
    <Card className="mb-8 overflow-hidden" padding="none">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-64 sm:h-80 md:h-96 w-full"
      >
        {images.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative h-64 sm:h-80 md:h-96  w-full">
              <Image
                src={image}
                alt={`${title} - صورة ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 66vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
};

export default ListingImageCarousel;
