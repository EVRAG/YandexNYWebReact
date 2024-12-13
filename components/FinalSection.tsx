import { pxToVw } from '@/utils/pxToVw';
import { QRCodeCanvas } from 'qrcode.react';

interface Props {
  data: string | number | string[]; // строка, число или массив строк
  onClick: () => void;
}

const FinalSection = ({ data, onClick }: Props) => {
  return (
    <>
      <div
        className='w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'
        style={{
          gap: pxToVw(40),
          paddingLeft: pxToVw(100),
          paddingRight: pxToVw(100),
          maxHeight: '47vw',
          overflow: 'hidden',
        }}
      >
        <img
          src='/icons/final_icon.svg'
          style={{
            width: pxToVw(300),
            height: pxToVw(110),
          }}
        />
        <h1
          className='text-center text-white leading-[104%] font-medium'
          style={{
            fontSize: pxToVw(60),
          }}
        >
          С наступающим Новым годом!
        </h1>

        <h2
          className='text-center text-white leading-[104%]'
          style={{
            fontSize: `clamp(${pxToVw(50)}, 2vw, ${pxToVw(60)})`,
          }}
        >
          {data.text}
        </h2>
      </div>
      <div
        className='absolute bottom-[50px] w-[61.5%] left-1/2 -translate-x-1/2'
        style={{
          bottom: pxToVw(100),
        }}
      >
        <div
          className='relative mx-auto'
          style={{
            width: pxToVw(214),
            height: pxToVw(214),
          }}
        >
          <div
            className='absolute'
            style={{
              background:
                'linear-gradient(90deg, rgba(199,153,98,1) 0%, rgba(131,95,51,1) 100%)',
              top: `-${pxToVw(6)}`,
              left: `-${pxToVw(6)}`,
              right: `-${pxToVw(6)}`,
              bottom: `-${pxToVw(6)}`,
              borderRadius: pxToVw(26),
            }}
          />
          <QRCodeCanvas
            value={data.cardUrl}
            className='!w-full !h-full relative'
            style={{
              borderRadius: pxToVw(20),
            }}
          />
          ,
        </div>

        <h3
          className='leading-[104%] text-white/80 text-center mt-5'
          style={{
            fontSize: pxToVw(44),
            marginTop: pxToVw(40),
          }}
        >
          Отсканируй QR-код и сохрани своё пожелание
        </h3>
      </div>
      <button
        onClick={onClick}
        className='absolute rounded-full text-white leading-[104%] left-1/2 -translate-x-1/2 font-medium'
        style={{
          background:
            'linear-gradient(90deg, rgba(199,153,98,1) 0%, rgba(131,95,51,1) 100%)',
          paddingLeft: pxToVw(100),
          paddingRight: pxToVw(100),
          paddingTop: pxToVw(48),
          paddingBottom: pxToVw(48),
          bottom: `-${pxToVw(284)}`,
          fontSize: pxToVw(72),
        }}
      >
        Ещё раз!
      </button>
    </>
  );
};

export default FinalSection;
