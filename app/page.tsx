'use client';
import Desire from '@/components/desire';
import FinalSection from '@/components/FinalSection';
import Greeting from '@/components/greeting';
import RequestLoader from '@/components/request-loader';
import { cn } from '@/utils/cn';
import { pxToVw } from '@/utils/pxToVw';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const steps = [
  {
    imageSrc: '/steps/step-1.png',
  },
  {
    imageSrc: '/steps/step-2.png',
  },
  {
    imageSrc: '/steps/step-3.png',
  },
  {
    imageSrc: '/steps/step-4.webp',
  },
];

const heightByIndex = {
  0: 1107,
  1: 2134,
  2: 656,
  3: 2445,
};

export default function Home() {
  const [height, setHeight] = useState(1107);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  const handleChangeSlide = useCallback((newIndex: number) => {
    setIsFadingOut(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFadingOut(false);
    }, 300);
  }, []);

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % steps.length;
    handleChangeSlide(nextIndex);
    setHeight(heightByIndex[nextIndex as keyof typeof heightByIndex]);
  }

  async function sendReq(str: string) {
    setIsLoading(true);
    nextSlide();
    try {
      const res = await fetch('https://yandexny.onrender.com/process_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: str }),
      });

      const data = await res.json();
      setFetchedData(data);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const componentByStep = {
    0: <Greeting onClick={nextSlide} />,
    1: <Desire onClick={sendReq} />,
    2: <RequestLoader isLoading={isLoading} onFinishedRequest={nextSlide} />,
    3: <FinalSection data={fetchedData} onClick={nextSlide} />,
  };

  return (
    <div
      className={cn(
        'fixed backdrop-blur-[30px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[5] w-[78%] duration-300 overflow-hidden transition-all',
        isFadingOut && 'opacity-0',
        !isFadingOut && 'opacity-100'
      )}
      style={{
        height: pxToVw(height),
        padding: pxToVw(120),
        borderRadius: pxToVw(64),
        width: currentIndex === 3 ? pxToVw(1320) : '78%',
      }}
    >
      {steps.map((item, index) => {
        return (
          <Image
            key={index}
            src={item.imageSrc}
            fill
            alt='bg-area'
            className={cn(
              'transition-opacity duration-300 z-[-1] opacity-0 object-cover',
              index === currentIndex && !isFadingOut && 'opacity-100',
              index !== currentIndex && !isFadingOut && 'opacity-0'
            )}
          />
        );
      })}
      <div
        className={cn('w-full h-full relative transition-all')}
        style={{
          height: currentIndex === 3 ? pxToVw(1920) : '100%',
        }}
      >
        {componentByStep[currentIndex as keyof typeof componentByStep]}
      </div>
    </div>
  );
}
