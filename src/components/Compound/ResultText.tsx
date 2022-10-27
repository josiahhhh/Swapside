import formatMoney from "@/utils/formatMoney";
import { ScrollArea, Table } from "@mantine/core";
import { Result } from "typings/typings";

interface Props {
  data: Result;
  initialDeposit: number;
}

const ResultsText: React.FC<Props> = ({ data, initialDeposit }) => {
  if (data === undefined) return null;

  // Get last year result
  const result = data[data.length - 1];

  // Definitions
  const initial = initialDeposit;
  const deposits = result.cumulativeRegularDeposits;
  const interest = result.cumulativeInterest;
  const total = result.cumulativeTotal;
  const year = result.yearNumber;

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th>Initial Deposit</th>
            <th>Regular Deposits</th>
            <th>Total Interest</th>
            <th>Total Savings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatMoney(initial)}</td>
            <td>{formatMoney(deposits)}</td>
            <td>{formatMoney(interest)}</td>
            <td>{formatMoney(total)}</td>
          </tr>
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default ResultsText;
