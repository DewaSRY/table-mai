import {
  FC,
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
  ChangeEvent,
} from "react";

interface DebouncedInputProps extends InputHTMLAttributes<HTMLDivElement> {
  debouch?: number;
  label: string;
  callback: (input: string) => void;
}
type DebouncedInputComponents = FC<DebouncedInputProps> & PropsWithChildren;
const DebouncedInput: DebouncedInputComponents = ({
  children,
  debouch = 7000,
  callback,
  label,
  ...resProps
}) => {
  const [value, setValue] = useState<string>(" ");
  useEffect(() => {
    let timeout = setTimeout(() => {
      callback(value);
    }, debouch);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <label htmlFor={label}>
      <h3>{label}</h3>
      <input
        className={`${resProps.className ? resProps.className : ""}`}
        {...resProps}
        value={value}
        onChange={handelChange}
        type="text"
        id={label}
        name={label}
      />
    </label>
  );
};

export default DebouncedInput;
