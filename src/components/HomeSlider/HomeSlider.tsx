"use client";

import { useEffect, useState } from "react";
import { getPublishedSessions } from "@/app/actions/getPublishedSessions";
import { Session } from "@prisma/client";
import Link from "next/link";
import Loader from "../loader/Loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HomeSlider() {
  const [slides, setSlides] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      const res = await getPublishedSessions();
      setSlides(res);
      setLoading(false);
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
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem 
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/3 px-2"
            >
              <div
                className="relative h-64 bg-cover bg-center shadow-lg rounded-lg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg">
                  <h2 className="text-white text-xl font-bold">{slide.title}</h2>
                  <p className="text-gray-300 text-sm">
                    {new Date(slide.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    href={`/sessions/${slide.id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm mt-2 underline transition-colors"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 hidden md:inline-flex" />
        <CarouselNext className="right-2 hidden md:inline-flex" />
      </Carousel>
    </div>
  );
}
