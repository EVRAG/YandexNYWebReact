import { pxToVw } from '@/utils/pxToVw';
import { useEffect, useState } from 'react';

interface Props {
  isLoading: boolean;
  onFinishedRequest: () => void;
}
const RequestLoader = ({ isLoading, onFinishedRequest }: Props) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLoading) {
      intervalId = setInterval(() => {
        setWidth((prevWidth) => {
          const increment = Math.random() * 10;
          return Math.min(prevWidth + increment, 90);
        });
      }, 500);
    } else if (isLoading === false) {
      setWidth(100);
      setTimeout(() => {
        onFinishedRequest();
      }, 450);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoading]);

  return (
    <>
      <div
        className='bg-[#C1ACFF]/[0.3] w-fit rounded-full mx-auto'
        style={{
          paddingLeft: pxToVw(32),
          paddingRight: pxToVw(32),
          paddingTop: pxToVw(20),
          paddingBottom: pxToVw(20),
        }}
      >
        <img
          src='/icons/hourglass_top.svg'
          style={{
            width: pxToVw(64),
            height: pxToVw(64),
          }}
        />
      </div>
      <h1
        className='text-white text-center leading-[104%]'
        style={{
          fontSize: pxToVw(60),
          marginTop: pxToVw(64),
        }}
      >
        Щелкунчик вальсирует. Мышиный король показывает фокусы, а я думаю только
        о тебе!
      </h1>

      <div
        className='relative w-[54%] mx-auto bg-[#C1ACFF]/[0.32] rounded-full overflow-hidden'
        style={{
          height: pxToVw(24),
          marginTop: pxToVw(100),
        }}
      >
        <div
          className='h-full bg-white rounded-full'
          style={{
            width: `${width}%`,
            transition: isLoading === false ? 'width 0.3s ease-out' : 'none',
          }}
        />
      </div>
    </>
  );
};

export default RequestLoader;
