import { pxToVw } from '@/utils/pxToVw';

interface Props {
  onClick: () => void;
}
const Greeting = ({ onClick }: Props) => {
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
          src='/icons/brightness_empty.svg'
          style={{
            width: pxToVw(64),
            height: pxToVw(64),
          }}
        />
      </div>
      <h1
        className='text-white font-medium text-center leading-[104%]'
        style={{
          fontSize: pxToVw(100),
          marginTop: pxToVw(60),
        }}
      >
        Добро пожаловать!
      </h1>
      <p
        className='font-normal text-white text-center leading-[104%]'
        style={{
          fontSize: pxToVw(60),
          marginTop: pxToVw(40),
        }}
      >
        Щелкунчик решил поставить в гостиной ещё одну ёлку. Без шариков и
        лампочек, зато с искусственным интеллектом.
      </p>
      <p
        className='font-normal text-white text-center leading-[104%]'
        style={{
          fontSize: pxToVw(60),
          marginTop: pxToVw(40),
        }}
      >
        Нажми на кнопку, чтобы включить меня.
      </p>

      <button
        className='text-white leading-[104%] font-medium rounded-full mx-auto flex'
        style={{
          background:
            'linear-gradient(90deg, rgba(199,153,98,1) 0%, rgba(131,95,51,1) 100%)',
          fontSize: pxToVw(72),
          marginTop: pxToVw(100),
          paddingLeft: pxToVw(100),
          paddingRight: pxToVw(100),
          paddingTop: pxToVw(48),
          paddingBottom: pxToVw(48),
        }}
        onClick={onClick}
      >
        Включить
      </button>
    </>
  );
};

export default Greeting;
