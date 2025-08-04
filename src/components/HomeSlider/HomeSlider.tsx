"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { getPublishedSessions } from "@/app/actions/getPublishedSessions";
import { Session } from "@prisma/client";
import Link from "next/link";
import Loader from "../loader/Loader";

export default function HomeSlider() {
  const [slides, setSlides] = useState<Session[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      const res = await getPublishedSessions();
      setSlides(res);
      setloading(false);
    };
    fetchSliders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full py-2">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-8xl mx-auto py-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-64 bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                <h2 className="text-white text-xl font-bold">{slide.title}</h2>
                <p className="text-gray-300 text-sm">
                  {slide.createdAt.toLocaleDateString()}
                </p>
                <Link
                  href={`/sessions/${slide.id}`}
                  className="text-blue-400 text-sm mt-2 underline"
                >
                  Read more
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
