import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  Fragment,
  useState,
  useRef,
} from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import ChildWrapper from "./ChidlWrapper";
interface indexProps extends HTMLAttributes<HTMLDivElement> {
  isExpand?: boolean;
}
type indexComponents = FC<indexProps> & PropsWithChildren;
const index: indexComponents = ({
  children,
  isExpand = false,
  ...resProps
}) => {
  const [expanded, setExpand] = useState(isExpand);
  const divEl = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    setExpand((prev) => !prev);
  };
  const handleClose = () => () => {
    setExpand(false);
  };

  return (
    <Fragment>
      <div
        ref={divEl}
        className={
          " relative" + `${resProps.className ? resProps.className : ""}`
        }
        {...resProps}
      >
        <div
          onClick={handleClick}
          className="text-3xl cursor-pointer outline-none w-full"
        >
          {expanded ? (
            <Fragment>
              <GoChevronDown />
            </Fragment>
          ) : (
            <Fragment>
              <GoChevronLeft />
            </Fragment>
          )}
        </div>
        <div className="w-full z-10">
          {expanded && (
            <ChildWrapper handleClose={handleClose()} parent={divEl.current!}>
              {children}
            </ChildWrapper>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default index;
