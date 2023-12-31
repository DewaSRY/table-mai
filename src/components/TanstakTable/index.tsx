import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useState,
  ChangeEvent,
} from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Button, { ButtonTypes } from "@/common/Button";
import Users, { UsersProps } from "@/lib/faker";
import DebouncedInput from "./DebounchdInput";
import SearchIcon from "@assets/SearchIcon";
import { handleDownload } from "./utils";
const columnHelper = createColumnHelper<UsersProps & { row: string }>();
const columns = [
  columnHelper.accessor("profile", {
    cell: (props) => (
      <img
        src={props.getValue()}
        alt=""
        className="rounded-full w-10 h-10 object-cover"
      />
    ),
    header: "Profile",
  }),
  columnHelper.accessor("firstName", {
    cell: (props) => <span>{props.getValue()}</span>,
    header: "Firs tName",
  }),
  columnHelper.accessor("lastName", {
    cell: (props) => <span>{props.getValue()}</span>,
    header: "Last tName",
  }),
  columnHelper.accessor("progress", {
    cell: (props) => <span>{props.getValue()}</span>,
    header: "Progress",
  }),
  columnHelper.accessor("visited", {
    cell: (props) => <span>{props.getValue()}</span>,
    header: "Visited",
  }),
];

interface indexProps extends HTMLAttributes<HTMLDivElement> {}
type indexComponents = FC<indexProps> & PropsWithChildren;
const index: indexComponents = ({ children, ...resProps }) => {
  // const columHealer = createColumnHelper<UsersProps>()
  const [data] = useState(
    Users.map((user) => Object.assign(user, { row: "" }))
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const handlePrevPage = () => {
    table.previousPage();
  };
  const handleNextPage = () => {
    table.nextPage();
  };

  const handelChangeGoTo = (e: ChangeEvent<HTMLInputElement>) => {
    let page = e.target.value ? Number(e.target.value) - 1 : 0;
    if (page < table.getPageCount()) {
      table.setPageIndex(page);
    }
  };
  const debouchInputValue = (input: string) => {
    setGlobalFilter(input);
  };
  return (
    <div
      {...resProps}
      className={
        `${resProps.className ? resProps.className : ""}` +
        " max-w-max  relative "
      }
    >
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <SearchIcon />
          <DebouncedInput
            callback={debouchInputValue}
            label="search"
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            placeholder="Search all columns..."
          />
        </div>
        <Button onClick={handleDownload(data, "data")}>Dowenload</Button>
      </div>
      <table className="">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="table-small text-left bg-gray-300 px-2"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length &&
            table.getRowModel().rows.map((row, id) => (
              <tr
                className={
                  `${id % 2 === 0 ? "bg-gray-300" : "bg-gray-100"}` +
                  " table-small px-2 py-2"
                }
                key={row.index}
              >
                {row.getVisibleCells().map((cel) => (
                  <td key={cel.id}>
                    {flexRender(cel.column.columnDef.cell, cel.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      <div className="absolute right-0 ">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={handlePrevPage}
          ButtonType={ButtonTypes.BaseButton}
          className=" text-4xl"
        >
          {"<"}
        </Button>
        <span className="mx-2 inline-block p-4 text-2xl pb-4">
          page{" "}
          <span>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
        </span>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={handleNextPage}
          ButtonType={ButtonTypes.BaseButton}
          className=" text-4xl"
        >
          {">"}
        </Button>
      </div>
      <label htmlFor="page-index" className="text-xl  ">
        <h3> go to </h3>
        <input
          id="page-index"
          className="border-b-2 "
          type="number"
          placeholder="type page here"
          onChange={handelChangeGoTo}
        />
      </label>
      <label htmlFor="page-size" className="text-xl  ">
        <h3> set page size </h3>
      </label>
      <select
        value={table.getState().pagination.pageSize}
        name="page-size"
        id=""
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

export default index;
