import { FC, ButtonHTMLAttributes, ReactNode, PropsWithChildren } from "react";
export const enum ButtonTypes {
  BaseButton = "border-none ",
  PrimaryButton = "bg-green-400 text-white border-green-400 ",
  SecondaryButton = "bg-blue-400 text-white border-blue-400 ",
  TernaryButton = "bg-sky-400 text-white border-sky-400 ",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ButtonType?: ButtonTypes;
  hidedButton?: boolean;
  activeButton?: boolean;
}
type ButtonComponent = FC<ButtonProps> & PropsWithChildren;
const Button: ButtonComponent = ({
  children,
  ButtonType = " ",
  hidedButton = false,
  activeButton = false,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={
        `${hidedButton ? " hidden " : " inline-block "}` +
        `${activeButton ? " brightness-75 text-black " : "  "}` +
        "border-2 text-lg rounded-sm " +
        "hover:brightness-50 " +
        " disabled:brightness-50 disabled:border-none disabled:opacity-40 " +
        ButtonType +
        ` ${restProps.className ? restProps.className : ""} marker:` +
        " active:scale-90 transition-all "
      }
    >
      {children}
    </button>
  );
};

export default Button;
