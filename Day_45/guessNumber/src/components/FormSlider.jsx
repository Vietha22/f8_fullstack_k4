import { Button, Input, Slider } from "@nextui-org/react";
import { useLayoutEffect, useRef, useState } from "react";
import { getMaxTimeByRange } from "../utils/function";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ACTION_TYPE } from "../actions/guessAction";

const KEY_RANGE = "RANGE_NUMBER";

export const FormSlider = () => {
  const inputRef = useRef();
  const buttonRef = useRef();
  const dispatch = useDispatch();

  const [rangeNumber, setRangeNumber] = useState(
    Number(localStorage.getItem(KEY_RANGE)) || 100
  );
  const totalNumberTry = getMaxTimeByRange(rangeNumber);
  const [restNumberTry, setRestNumberTry] = useState(totalNumberTry);
  const [guessNumber, setGuessNumber] = useState(
    Math.floor(Math.random() * rangeNumber) + 1
  );
  const [inputValue, setInputValue] = useState();
  const [isRePlay, setIsRePlay] = useState(false);
  const [listNumber, setListNumber] = useState([]);

  useLayoutEffect(() => {
    const down = (e) => {
      if (e.key >= 0 && e.key <= 9) {
        inputRef && inputRef.current.focus();
        return;
      }
      if (e.key === "Enter") {
        isRePlay ? buttonRef.current.click() : inputRef.current.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        // if (!inputValue || Number(inputValue) === 1) {
        //   setInputValue(1);
        //   return;
        // }
        // setInputValue(prev => Number(prev) -1)
        setInputValue((prev) => {
          if (!prev || Number(prev) === 1) return 1;
          return Number(prev) - 1;
        });
        return;
      }
      if (e.key === "ArrowUp") {
        // if (!inputValue) {
        //   setInputValue(1);
        //   return;
        // }
        // setInputValue((prev) => Number(prev) + 1);
        setInputValue((prev) => {
          if (!prev) return 1;
          if (Number(prev) === rangeNumber) return rangeNumber;
          return Number(prev) + 1;
        });
        return;
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isRePlay, rangeNumber]);

  const onReset = ({ isGuessed, isGuessSuccess }) => {
    if (isGuessed) {
      setRestNumberTry(totalNumberTry);
      dispatch({
        type: ACTION_TYPE.ADD_TO_LIST,
        payload: {
          maxTime: totalNumberTry,
          right: isGuessSuccess,
          data: [...listNumber, Number(inputValue)],
        },
      });
    }
    setListNumber([]);
    setIsRePlay(isGuessed);
  };

  const onSetValueSlider = (value) => {
    onReset({ isGuessed: false, isGuessSuccess: false });
    setRangeNumber(value);
    setRestNumberTry(getMaxTimeByRange(value));

    localStorage.setItem(KEY_RANGE, value);

    const newGuessNumber = Math.floor(Math.random() * value) + 1;
    setGuessNumber(newGuessNumber);

    toast.info("Chào mừng bạn đến với trò chơi đoán số!");
  };

  const onChangeInputValue = (e) => {
    // Remove non-numeric characters from the input value
    const re = /^[0-9\b]+$/;
    const value = e.target.value;
    if ((value === "" || re.test(value)) && Number(value) <= rangeNumber) {
      setInputValue(e.target.value);
    }
  };

  const onGuessNumber = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    const numberInputValue = Number(inputValue);

    if (listNumber.includes(numberInputValue)) {
      return toast.warn("Bạn đã từng nhập số này rồi!");
    }
    setListNumber((prev) => [...prev, numberInputValue]);
    setRestNumberTry((prev) => (prev > 0 ? prev - 1 : prev));
    if (restNumberTry === 1 && numberInputValue !== guessNumber) {
      onReset({ isGuessed: true, isGuessSuccess: false });
      return toast.error(
        `Đáng lẽ ra bạn nên ${
          numberInputValue > guessNumber ? "giảm" : "tăng"
        } 1 chút!`
      );
    }

    if (numberInputValue < guessNumber) {
      return toast.warn("Hmm...Bạn cần tăng một chút");
    }
    if (numberInputValue > guessNumber) {
      return toast.warn("Hmm...Bạn cần giảm một chút");
    }

    toast.success("Chúc mừng bạn, bạn đã trả lời đúng!");
    onReset({ isGuessed: true, isGuessSuccess: true });
  };
  const onRePlay = () => {
    setIsRePlay(false);
    setInputValue("");
    setGuessNumber(Math.floor(Math.random() * rangeNumber) + 1);
  };

  return (
    <div className="">
      <h2 className="text-primary text-4xl font-bold">
        Còn {restNumberTry}/{totalNumberTry} lần
      </h2>

      <h2 className="text-primary-700 text-4xl font-bold mb-2">
        Bạn cần tìm kiếm một số từ 1 đến {rangeNumber}
      </h2>
      <Slider
        aria-label="Volume"
        size="sm"
        showTooltip
        minValue={5}
        maxValue={2048}
        marks={[
          {
            value: 100,
            label: "100",
          },
          {
            value: 512,
            label: "512",
          },
          {
            value: 1024,
            label: "1024",
          },
          {
            value: 1536,
            label: "1536",
          },
          {
            value: 2048,
            label: "2048",
          },
        ]}
        defaultValue={rangeNumber}
        className="w-full"
        onChangeEnd={onSetValueSlider}
      />

      {isRePlay ? (
        <Button
          color="primary"
          ref={buttonRef}
          onClick={onRePlay}
          radius="sm"
          size="md"
          className="mt-4 bg-primary-200 font-semibold"
        >
          Chơi lại
        </Button>
      ) : (
        <form
          className="mt-6 space-y-2"
          onSubmit={onGuessNumber}
          autoComplete="off"
        >
          <label htmlFor="number" className="text-primary text-sm">
            Hãy thử nhập một số
          </label>
          <Input
            variant="bordered"
            size="sm"
            ref={inputRef}
            id="number"
            name="number"
            placeholder="Thử một số"
            value={inputValue}
            onChange={onChangeInputValue}
          />
        </form>
      )}
    </div>
  );
};
