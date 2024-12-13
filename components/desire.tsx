import { pxToVw } from '@/utils/pxToVw';
import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const responses = [
  'Хочу достроить дом!',
  'Успеха в карьере!',
  'Счастья в личной жизни!',
  'Путешествовать больше!',
  'Быть здоровым!',
  'Найти любовь!',
  'Смелых решений!',
  'Исполнения желаний!',
  'Хочу закончить ремонт!',
];

interface Props {
  onClick: (str: string) => void;
}
const Desire = ({ onClick }: Props) => {
  const [layoutName, setLayoutName] = useState('default');
  const [userInput, setUserInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleAddPreset = (phrase: string) => {
    const space =
      cursorPosition > 0 && !userInput[cursorPosition - 1]?.endsWith(' ')
        ? ' '
        : '';
    const newInput =
      userInput.slice(0, cursorPosition) +
      space +
      phrase +
      userInput.slice(cursorPosition);

    setUserInput(newInput);
    setCursorPosition(cursorPosition + space.length + phrase.length);
  };

  const handleChange = (e: any) => {
    setUserInput(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  const handleKeyPress = (button: any) => {
    let newInput = userInput;

    if (button === '{bksp}') {
      if (cursorPosition === 0) return;
      newInput =
        userInput.slice(0, cursorPosition - 1) +
        userInput.slice(cursorPosition);
      setCursorPosition(Math.max(0, cursorPosition - 1));
    } else if (button === '{space}') {
      newInput =
        userInput.slice(0, cursorPosition) +
        ' ' +
        userInput.slice(cursorPosition);
      setCursorPosition(cursorPosition + 1);
    } else if (button === '{shift}') {
      const target = layoutName === 'shift' ? 'default' : 'shift';
      setLayoutName(target);
    } else {
      newInput =
        userInput.slice(0, cursorPosition) +
        button +
        userInput.slice(cursorPosition);
      setCursorPosition(cursorPosition + 1);
    }

    setUserInput(newInput);
  };

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
          src='/icons/draw.svg'
          style={{
            width: pxToVw(64),
            height: pxToVw(64),
          }}
        />
      </div>
      <h1
        className='text-white font-medium text-center leading-[104%]'
        style={{
          fontSize: pxToVw(60),
          marginTop: pxToVw(60),
          marginBottom: pxToVw(100),
        }}
      >
        Напиши, что важно для тебя сейчас. В ответ пришлю твоё новогоднее
        поздравление
      </h1>

      <textarea
        inputMode='none'
        value={userInput}
        onChange={handleChange}
        // @ts-ignore
        onSelect={(e) => setCursorPosition(e.target.selectionStart)}
        ref={(ref) => {
          if (ref) {
            ref.setSelectionRange(cursorPosition, cursorPosition);
          }
        }}
        className='border-white/[0.32] bg-white/20 w-full text-white font-["5ka Sans Design"]'
        style={{
          borderWidth: pxToVw(4),
          borderRadius: pxToVw(48),
          padding: pxToVw(40),
          minHeight: pxToVw(400),
          fontSize: pxToVw(64),
        }}
      />

      <div
        className='grid grid-cols-3'
        style={{
          marginTop: pxToVw(40),
          marginBottom: pxToVw(40),
          gap: pxToVw(16),
        }}
      >
        {responses.map((str: string, index: number) => {
          return (
            <button
              key={index}
              onClick={() => handleAddPreset(str)}
              className='text-center text-white bg-[#482D75] font-["5ka Sans Design"]'
              style={{
                paddingLeft: pxToVw(34),
                paddingRight: pxToVw(34),
                paddingTop: pxToVw(28),
                paddingBottom: pxToVw(28),
                borderRadius: pxToVw(24),
                fontSize: pxToVw(32),
              }}
            >
              {str}
            </button>
          );
        })}
      </div>

      <Keyboard
        onKeyPress={handleKeyPress}
        layout={{
          default: [
            '\u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a',
            '\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d',
            '{shift} \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e {bksp}',
            '{space}',
          ],
          shift: [
            '\u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a',
            '\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d',
            '{shift} \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e {bksp}',
            '{space}',
          ],
        }}
        display={{
          '{bksp}': '⌫',
          '{shift}': '⇧',
          '{space}': '␣',
        }}
        layoutName={layoutName}
      />

      <button
        className='text-white leading-[104%] font-medium rounded-full mx-auto flex'
        style={{
          background:
            'linear-gradient(90deg, rgba(199,153,98,1) 0%, rgba(131,95,51,1) 100%)',
          paddingLeft: pxToVw(100),
          paddingRight: pxToVw(100),
          paddingTop: pxToVw(48),
          paddingBottom: pxToVw(48),
          fontSize: pxToVw(72),
          marginTop: pxToVw(100),
        }}
        onClick={() => {
          if (userInput.trim().length) {
            onClick(userInput);
          }
        }}
      >
        Поздравить
      </button>
    </>
  );
};

export default Desire;
