import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const mappingColor = {
  1: "text-[#68D391]",
  2: "text-[#9AE6B4]",
  3: "text-[#81e6d9]",
  4: "text-[#4fd1c5]",
  5: "text-[#FAF089]",
  6: "text-[#F6E05E]",
  7: "text-[#F6AD55]",
  8: "text-[#ED8936]",
  9: "text-[#F56565]",
  10: "text-[#E53E3E]",
  11: "text-[#C53030]",
};

export const TableResult = ({ data, playTimes, totalTimes }) => {
  const { data: listNumber, right, maxTime } = data;
  const numberTry = listNumber.length || 0;

  const columns = [
    {
      key: "stt",
      label: "Số lần nhập",
    },
    {
      key: "input",
      label: "Số nhập vào",
    },
  ];

  const renderStt = (number) => {
    return <span className={mappingColor[number]}>{number}</span>;
  };

  const renderResult = (number, isLast) => {
    if (isLast && right) {
      return <span className="text-[#4fd1c5]">{number}</span>;
    }
    return <span className="text-red-800 ">{number}</span>;
  };

  const renderPercentage = () => {
    let numberNotTry = maxTime - numberTry;
    if (numberNotTry === 0 && right) {
      numberNotTry = 1;
    }
    const percent = ((numberNotTry / maxTime) * 100).toFixed(2);

    const ratioInt = Math.floor((numberTry / maxTime) * 10);

    const formattedPercent = percent.endsWith(".00")
      ? percent.slice(0, -3)
      : percent;

    return (
      <span className={mappingColor[ratioInt]}>
        Tỷ lệ đúng: {formattedPercent}%
      </span>
    );
  };

  return (
    <div className="w-full border-2 border-primary rounded-lg py-4">
      <Table
        aria-label="table"
        className="w-screen max-w-full tableRes"
        removeWrapper
        isCompact
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align="center"
              className="text-[14px] text-center h-5 text-foreground"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {(listNumber || []).map((item, index) => (
            <TableRow
              key={`${item}-row-${index}`}
              className="dark:border-white/10 border-[#E2E8F0] border-b"
            >
              <TableCell
                align="center"
                className="text-center font-medium text-[13px] p-0"
              >
                {renderStt(index + 1)}
              </TableCell>
              <TableCell
                align="center"
                className="text-center font-medium text-[13px] pt-0"
              >
                {renderResult(item, numberTry === index + 1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-6">
        <div className="flex flex-col space-y-6">
          <p>
            Lần chơi thứ: {playTimes}/{totalTimes}
          </p>
          <p>
            Số lần nhập tối đa:{" "}
            <span className="text-[#4fd1c5]">{maxTime}</span>
          </p>
          {renderPercentage()}
        </div>
      </div>
    </div>
  );
};
