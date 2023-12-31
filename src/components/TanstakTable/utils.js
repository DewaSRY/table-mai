import * as XLSX from "xlsx/xlsx.mjs";
export const handleDownload = (data, fileName) => () => {
  const datas = data?.length ? data : [];
  const worksheet = XLSX.utils.json_to_sheet(datas);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
};
