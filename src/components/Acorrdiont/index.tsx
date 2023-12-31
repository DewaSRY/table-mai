import {
  FC,
  Fragment,
  HTMLAttributes,
  PropsWithChildren,
  useState,
} from "react";
import Expanded from "@common/Expanded";

export type AccordionProps = {
  title: string;
  content: string;
};

interface indexProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionProps[];
}
type indexComponents = FC<indexProps> & PropsWithChildren;
const index: indexComponents = ({ items, ...resProps }) => {
  const [isExpand, setIsExpand] = useState(-1);
  const handleClick = (id: number) => () => {
    setIsExpand(id);
  };
  console.log(isExpand);
  return (
    <div
      {...resProps}
      className={`${resProps.className ? resProps.className : ""}`}
    >
      {items.map((item, id) => (
        <Fragment key={item.title + id}>
          <h2>{item.title}</h2>
          <Expanded isExpand={isExpand === id} onClick={handleClick(id)}>
            <p>{item.content}</p>
          </Expanded>
        </Fragment>
      ))}
    </div>
  );
};

export default index;
