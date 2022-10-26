import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";

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
import axios from "@/utils/axios";
import { DataTable } from "mantine-datatable";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { StockIpo } from "typings/typings";

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

const IpoCalendar: NextPage = () => {
  const { classes } = useStyles();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ipoCalendarInformation, setIpoCalendarInformation] = useState<
    StockIpo[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(`/api/v2/ipo`);
        setIpoCalendarInformation(response);
      } catch (error) {
        console.log(error);
        setError(null);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const rows =
    ipoCalendarInformation.map((stock) => ({
      date: stock.date,
      symbol: stock.symbol,
      priceRange: stock.princeRange || "0",
      shares: stock.shares || "0",
    })) || [];

  return (
    <Layout>
      <Meta title="Ipo Calendar" />

      <Container className={classes.wrapper}>
        <Title>IPO Calendar</Title>
        <Text mb={"md"}>Stay up to date with upcoming IPOs!</Text>
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
                borderRadius="sm"
                withColumnBorders
                striped
                highlightOnHover
                records={[...rows]}
                noRecordsText="No records found"
                columns={[
                  {
                    accessor: "Date",
                    render: ({ date }) => <Text weight={700}>{date}</Text>,
                  },
                  {
                    accessor: "Symbol",
                    render: ({ symbol }) => (
                      <Text
                        key={symbol}
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
                    accessor: "Price Range",
                    render: ({ priceRange }) => (
                      <Text weight={700}>{priceRange}</Text>
                    ),
                  },
                  {
                    accessor: "Shares",
                    render: ({ shares }) => (
                      <Text weight={700}>
                        {Number(shares).toLocaleString("en-US")}
                      </Text>
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

export default IpoCalendar;
