"use client";
import { FC, useMemo, useState } from "react";

type Error = {
  day?: string;
  month?: string;
  year?: string;
};

type Date = {
  day?: number;
  month?: number;
  year?: number;
};

type NumberInputProps = {
  value?: number;
  setValue: (_v: number) => void;
  label: string;
  placeholder: string;
  errorMessage?: string;
  hasError?: boolean;
};

const NumberInput: FC<NumberInputProps> = ({
  value,
  setValue,
  label,
  placeholder,
  errorMessage,
  hasError,
}) => {
  return (
    <div className="flex flex-col w-full gap-2 text-neutralSmokeyGrey relative">
      <label
        className={`${
          hasError ? "text-primaryLightRed" : "text-smokeGrey"
        } font-bold tracking-widest text-sm desktop:text-[16px]`}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        placeholder={placeholder}
        className={`w-full h-16 bg-transparent border text-neutralOffBlack ${
          hasError ? "border-primaryLightRed" : "border-neutralLightGrey"
        } rounded-md p-5 font-bold text-2xl desktop:text-body focus:outline-primaryPurple focus:outline`}
        type="number"
        required
      />
      {errorMessage && (
        <p className="absolute -bottom-5 italic text-primaryLightRed text-[10px] sm:text-xs">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

type ResultTextProps = {
  sAge: number | undefined;
  label: string;
};

const ResultText: FC<ResultTextProps> = ({ sAge, label }) => (
  <p className="text-neutralOffBlack text-6xl desktop:text-8xl font-bold italic">
    {" "}
    <span className="text-primaryPurple pr-2">{sAge ?? "--"}</span>
    {label}
  </p>
);

const Home = () => {
  const [date, setDate] = useState<Date>({});
  const [age, setAge] = useState<Date>({});
  const [errors, setErrors] = useState<Error>({});

  const validateInput = (
    value: number | undefined,
    maxInput: number
  ): string => {
    if (value === undefined || isNaN(value)) {
      return "This field is required";
    }

    if (value < 1 || value > maxInput) {
      return "Must be a valid date";
    }

    return "";
  };

  const calculateAge = () => {
    const maxDays = new Date(date.year!, date.month!, 0).getDate() || 31;

    const error = {
      year: validateInput(date.year, Infinity),
      month: validateInput(date.month, 12),
      day: validateInput(date.day, maxDays),
    };

    if (error.year || error.month || error.day) {
      setErrors(error);
      return;
    }

    const today = new Date();
    const inputDate = new Date(date.year!, date.month! - 1, date.day);

    let year = today.getFullYear() - inputDate.getFullYear();
    let month = today.getMonth() - inputDate.getMonth();
    let day = today.getDate() - inputDate.getDate();

    if (day < 0) {
      const lastMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      day += lastMonthDays;
      month--;
    }

    if (month < 0) {
      year--;
      month += 12;
    }

    setAge({ year, month, day });
    setErrors({});
  };

  const hasError = useMemo(
    () => !!errors.year || !!errors.month || !!errors.day,
    [errors]
  );

  return (
    <main className="bg-neutralOffWhite flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-4 bg-white rounded-2xl rounded-br-[10rem] w-full desktop:w-2/5 h-3/5 desktop:h-4/6 p-6 desktop:p-12 ">
        <div className="flex gap-6 desktop:gap-6 desktop:w-3/4 w-full">
          <NumberInput
            value={date.day}
            setValue={(val) => setDate({ ...date, day: val })}
            label="DAY"
            placeholder="DD"
            errorMessage={errors.day}
            hasError={hasError}
          />
          <NumberInput
            value={date.month}
            setValue={(val) => setDate({ ...date, month: val })}
            label="MONTH"
            placeholder="MM"
            errorMessage={errors.month}
            hasError={hasError}
          />
          <NumberInput
            value={date.year}
            setValue={(val) => setDate({ ...date, year: val })}
            label="YEAR"
            placeholder="YYYY"
            errorMessage={errors.year}
            hasError={hasError}
          />
        </div>
        <div className="flex items-center justify-center w-full ">
          <div className="h-px w-full bg-neutralLightGrey" />
          <div
            tabIndex={1}
            className="cursor-pointer flex items-center justify-center bg-primaryPurple hover:bg-neutralOffBlack w-52 desktop:w-24 h-20 rounded-full duration-200 transition-colors"
            onClick={calculateAge}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="44"
              viewBox="0 0 46 44"
            >
              <g fill="none" stroke="#FFF" strokeWidth="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
              </g>
            </svg>
          </div>
          <div className="block desktop:hidden h-px w-full bg-neutralLightGrey" />
        </div>

        <div className="flex flex-col gap-2">
          <ResultText sAge={age.year} label="years" />
          <ResultText
            sAge={age.month}
            label={age.month! > 1 ? "months" : "month"}
          />
          <ResultText sAge={age.day} label="days" />
        </div>
      </div>
    </main>
  );
};

export default Home;
