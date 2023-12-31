import { FC, HTMLAttributes, PropsWithChildren, useEffect } from "react";

interface ChildWrapperProps extends HTMLAttributes<HTMLDivElement> {
  parent: HTMLDivElement;
  handleClose: () => void;
}
type ChildWrapperComponents = FC<ChildWrapperProps> & PropsWithChildren;
const ChildWrapper: ChildWrapperComponents = ({
  children,
  parent,
  handleClose,
  ...resProps
}) => {
  useEffect(() => {
    console.log("build");
    const handler = (event: MouseEvent) => {
      if (!parent) return;
      console.log(event.target);
      if (!parent.contains(event.target as HTMLElement)) {
        handleClose();
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
      console.log("remove");
    };
  }, []);
  return (
    <div
      {...resProps}
      className={`${resProps.className ? resProps.className : ""}`}
    >
      {children}
    </div>
  );
};

export default ChildWrapper;
