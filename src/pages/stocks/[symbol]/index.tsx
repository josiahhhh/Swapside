import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import Statement from "@/components/Statement";

import {
  Badge,
  Box,
  Card,
  Container,
  createStyles,
  Divider,
  Group,
  Image,
  Tabs,
  Text,
  Title,
} from "@mantine/core";

import { fetchCompanyDetails, fetchCompanyNews } from "app/slices/stockSlice";
import { wrapper } from "app/store";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { BaseStock, StockNews } from "typings/typings";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
  },
  inner: {
    display: "flex",
  },
  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    "& *": {
      cursor: "pointer",
    },
  },
}));

const Stocks: NextPage = ({
  data,
  news,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { classes } = useStyles();

  return (
    <>
      <Meta title={`${data.map((d: BaseStock) => d.symbol)}`} />

      <Layout>
        <Container>
          {data ? (
            data.map((item: BaseStock) => (
              <>
                <Box id="StockHome">
                  <div className={classes.inner}>
                    <Title>{item.companyName}</Title>
                    <Badge size="sm">{item.symbol}</Badge>
                  </div>
                  <Group noWrap spacing={10} mt={5}>
                    <Text size={"lg"} weight={500}>
                      ${item.price}
                    </Text>
                    <Text>
                      Updated: {new Date().toDateString()}, 9:30 am EDT
                    </Text>
                  </Group>
                </Box>
                <Divider my="sm" variant="dashed" />
                <Tabs
                  mt={"md"}
                  color="indigo"
                  variant="outline"
                  defaultValue="chart"
                >
                  <Tabs.List>
                    <Tabs.Tab value="fsummary">Financial Summary</Tabs.Tab>
                    <Tabs.Tab value="fstatements">
                      Financial Statements
                    </Tabs.Tab>
                    <Tabs.Tab value="chart">Chart</Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="fsummary" pt="xs">
                    <Card withBorder radius="md" className={classes.card}>
                      <Text>{item.symbol} information</Text>
                      <Text size="xs" color="dimmed" mt={3} mb="xl">
                        Powered by cavemanalerts.com
                      </Text>
                      <Group
                        position="apart"
                        className={classes.item}
                        noWrap
                        spacing="xl"
                      >
                        <div>
                          <Text>
                            <Text weight={700} component="span">
                              Website:
                            </Text>{" "}
                            {item.website}
                          </Text>

                          <Divider size={"md"} />
                          <Text mt={"lg"}>
                            <Text weight={700} component="span">
                              Sector:
                            </Text>{" "}
                            {item.sector}
                          </Text>
                          <Divider size={"md"} />
                          <Text mt={"lg"}>
                            <Text weight={700} component="span">
                              Industry:
                            </Text>{" "}
                            {item.industry}
                          </Text>
                          <Divider size={"md"} />
                          <Text mt={"lg"}>
                            <Text weight={700} component="span">
                              Employees:
                            </Text>{" "}
                            {item.fullTimeEmployees}
                          </Text>
                          <Divider size={"md"} />
                          <Text mt={"lg"}>
                            <Text weight={700} component="span">
                              Country:
                            </Text>{" "}
                            {item.country}
                          </Text>
                          <Divider size={"md"} sx={{ width: "900px" }} />
                          <Text mt={"lg"}>
                            <Text weight={700} component="span">
                              Exchange:
                            </Text>{" "}
                            {item.exchange}
                          </Text>
                          <Divider size={"md"} />
                          <Text mt={"lg"}>
                            <Text weight={700} component="span">
                              CEO:
                            </Text>{" "}
                            {item.ceo}
                          </Text>
                          <Divider size={"md"} />
                          <Text mt={"lg"}>
                            <Text weight={700} component="span">
                              Currency:
                            </Text>{" "}
                            {item.currency}
                          </Text>
                          <Divider size={"md"} />
                        </div>
                      </Group>
                    </Card>
                  </Tabs.Panel>

                  <Tabs.Panel value="fstatements" pt="xs">
                    <Statement />
                  </Tabs.Panel>

                  <Tabs.Panel value="chart" pt="xs">
                    <iframe
                      style={{ height: "500px", width: "100%" }}
                      src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_37a93&amp;symbol=${item.symbol}&theme=dark&amp;interval=240&amp;range=1M&amp;hidesidetoolbar=0&amp;saveimage=1`}
                    />
                  </Tabs.Panel>
                </Tabs>
              </>
            ))
          ) : (
            <Text size={"lg"}>
              Sorry that stock doesn't exist! Please search a better name or go
              back home.
            </Text>
          )}
          <Divider m={"lg"} />
          <Box>
            {news
              ? news.map((item: StockNews, index: any) => (
                  <Card
                    component={"a"}
                    href={item.url}
                    key={index}
                    p="xl"
                    mt={"md"}
                    shadow={"lg"}
                    withBorder
                  >
                    <Card.Section>
                      <Image src={item.image} height={160} alt="Norway" />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                      <Text weight={500}>{item.title}</Text>
                      <Badge color="pink" variant="light">
                        {item.symbol}
                      </Badge>
                    </Group>
                  </Card>
                ))
              : null}
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { symbol } = context.query;

    const data = await store.dispatch(fetchCompanyDetails(symbol as string));
    const returnData: BaseStock = data.payload;

    const newsData = await store.dispatch(fetchCompanyNews(symbol as string));
    const returnNews: StockNews = newsData.payload;

    return {
      props: {
        data: returnData ? returnData : [],
        news: returnNews ? returnNews : [],
      },
    };
  });

export default Stocks;
