import { Fullscreen } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <section
      className="relative flex items-center justify-center text-white w-full h-lvh"
      aria-label="Hero Section"
    >
      <Image src='/assets/hero.png' alt='hero image' width={500} height={500} className='w-full h-full' />
      <div className='absolute top-0 left-0 w-full h-full bg-[#011936D4] z-10 flex flex-col justify-center items-center gap-10'>
        <h1 className='text-6xl font-bold'>Achieve Your Peak Performance</h1>
        <h2 className='text-4xl font-bold text-[#CCC7B9]'>Your Fitness Journey, Simplified</h2>
        <p className='text-xl text-[#CCC7B9]'>Track progress, set goals, and conquer challenges with our all-in-one gym management system.</p>
        <button className='bg-[#A41623] py-4 px-20 rounded-md m-7'>Call us</button>
      </div>
    </section>
  );
};

export default Hero;
