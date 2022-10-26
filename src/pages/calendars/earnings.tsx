import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import getEarningsCalendar from "@/utils/axios/earnings";

import {
  Box,
  Container,
  createStyles,
  Divider,
  Loader,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { DataTable } from "mantine-datatable";

import moment from "moment";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { StockEarning } from "typings/typings";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: "40px",
    textAlign: "center",
  },
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

const defaultEarnings = {
  to: "2022-10-01",
  from: moment().format("YYYY-MM-DD"),
};

const EarningsCalendar: NextPage = () => {
  const { classes } = useStyles();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [earningsCalendarInfo, setEarningsCalendarInfo] = useState<
    StockEarning[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      getEarningsCalendar(defaultEarnings.to, defaultEarnings.from)
        .then((response: any) => {
          let earningsCalendarItems = response.data;
          setEarningsCalendarInfo(earningsCalendarItems);
        })
        .catch((err) => {
          console.log("Error getting earnings calendar data: ", err);
          setError(err);
        });

      setLoading(false);
    };

    fetchData();
  }, []);

  const rows =
    earningsCalendarInfo.map((stock) => ({
      date: stock.date,
      symbol: stock.symbol,
      eps: stock.eps || "N/A",
      revenue: stock.revenue || "N/A",
      endingFiscalQuarter: stock.fiscalDateEnding || "N/A",
    })) || [];

  return (
    <Layout>
      <Meta title="Earnings Calendar" />

      <Container className={classes.wrapper}>
        <Title>Earnings Calendar</Title>
        <Text mb={"md"}>Upcoming Earnings Calendar!</Text>
        <Divider mb={"md"} />

        <Box
          mt={"lg"}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            textAlign: "center",
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            cursor: "pointer",

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1],
            },
          })}
        >
          {loading ? (
            <Loader />
          ) : error ? (
            <p>Something went wrong</p>
          ) : (
            <ScrollArea>
              <DataTable
                withBorder
                borderRadius="md"
                shadow="lg"
                withColumnBorders
                striped
                highlightOnHover
                records={[...rows]}
                columns={[
                  {
                    accessor: "Date",
                    render: ({ date }) => <Text weight={700}>{date}</Text>,
                  },
                  {
                    accessor: "Symbol",
                    render: ({ symbol }) => (
                      <Text
                        component={NextLink}
                        href={`/stocks/${symbol}`}
                        color={"blue"}
                        weight={700}
                      >
                        {symbol}
                      </Text>
                    ),
                  },
                  {
                    accessor: "Eps",
                    render: ({ eps }) => <Text weight={700}>{eps}</Text>,
                  },
                  {
                    accessor: "Revenue",
                    render: ({ revenue }) => (
                      <Text weight={700}>{revenue}</Text>
                    ),
                  },
                  {
                    accessor: "Fiscal Date Ending",
                    render: ({ endingFiscalQuarter }) => (
                      <Text weight={700}>{endingFiscalQuarter}</Text>
                    ),
                  },
                ]}
              />
            </ScrollArea>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default EarningsCalendar;
