import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { getTranslations } from 'next-intl/server';

const Hero = async () => {
  const t = await getTranslations("IndexPage");
  return (
    <section
      className="relative flex items-center justify-center text-white w-full min-h-lvh"
      aria-label="Hero Section"
    >
      <Image src='/assets/hero.png' alt='hero image' width={500} height={500} className='w-full h-full object-cover absolute top-0 left-0' />
      <div className='w-full h-full bg-[#011936D4] z-10 flex flex-col justify-center text-center items-center gap-10'>
        <h1 className='md:text-6xl text-3xl font-bold'>{t("HeroTitle")}</h1>
        <h2 className='md:text-4xl text-xl font-bold text-[#CCC7B9]'>{t("HeroSubtitle")}</h2>
        <p className='text-xl text-[#CCC7B9]'>{t("HeroText")}</p>
        <Button size='xl'>{t("HeroCTA")}</Button>
      </div>
    </section>
  );
};

export default Hero;
