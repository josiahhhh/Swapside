import { createStyles, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import { StockFinance } from "typings/typings";
import fetcher from "utils/fetcher";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const Statement = () => {
  const { data, error } = useSWR<StockFinance[]>("/api/v2/statement", fetcher, {
    refreshInterval: 2000,
  });

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const rows = data.map((row) => (
    <tr key={row.symbol}>
      <td>{row.calendarYear}</td>
      <td>{row.netIncome.toLocaleString("en-US")}</td>
      <td>{row.costOfRevenue.toLocaleString("en-US")}</td>
      <td>{row.revenue.toLocaleString("en-US")}</td>
    </tr>
  ));

  return (
    <div>
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table
          verticalSpacing={"sm"}
          horizontalSpacing={"sm"}
          sx={{ minWidth: 700 }}
        >
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Year</th>
              <th>Net Income</th>
              <th>Cost of Revenue</th>
              <th>Revenue</th>
            </tr>
          </thead>
          {data.map((d) => (
            <tbody>{rows}</tbody>
          ))}
        </Table>
      </ScrollArea>
    </div>
  );
};

export default Statement;
