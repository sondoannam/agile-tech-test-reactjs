'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { ArrowLeft, ArrowRight } from '@components/UI/IconJsx';
import { GalleriesRes } from 'src/models';

interface CarouselProps {
  testimonials: GalleriesRes[];
  interval?: number;
}

const Carousel = ({ testimonials, interval = 5000 }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, interval);
    return () => {
      clearInterval(autoPlayInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);
  
  return (
    <div className="carousel">
      <button title='prev' onClick={prevSlide} className="carousel_btn carousel_btn_prev">
        <ArrowLeft />
      </button>
      <div className='_container'>
        <Image
          src={testimonials[activeIndex].imageUrl}
          alt={`Slide ${activeIndex}`}
          width={932}
          height={330}
          className="carousel_img"
        />
        <div className='carousel_text'>
          <div className='flex flex-col'>
            <h5 className='subtitle-1'>John Fang</h5>
            <p className='subtitle-desc'>wordfaang.com</p>
          </div>
          <p className="carousel_desc body-1">{testimonials[activeIndex].desctiption}</p>
        </div>
      </div>
      <button title='next' onClick={nextSlide} className="carousel_btn carousel_btn_next">
        <ArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
