import Layout from "@/components/Global/Layout";
import Loader from "@/components/Global/Loader";
import { Meta } from "@/components/Global/Meta";
import {
  Badge,
  Box,
  Card,
  Container,
  createStyles,
  Divider,
  Group,
  ScrollArea,
  Text,
  Image,
  Title,
} from "@mantine/core";
import { fetchSectorNews, fetchSectorNewsInfo } from "app/slices/stockSlice";
import { wrapper } from "app/store";
import { DataTable } from "mantine-datatable";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import useSWR from "swr";
import { StockNews, StockPerformance } from "typings/typings";
import fetcher from "utils/fetcher";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 20,
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

const SectorPerformance: NextPage = ({
  news,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { classes } = useStyles();
  const { data, error } = useSWR<StockPerformance[]>(
    "/api/v2/performance",
    fetcher
  );

  if (error) return <Text className={classes.text}>failed to load</Text>;
  if (!data) return <Loader />;

  const rows =
    data.map((sector) => ({
      sector: sector.sector,
      change: sector.changesPercentage,
    })) || [];

  return (
    <>
      <Meta title="Sector Perfofrmance" />
      <Layout>
        <Container className={classes.wrapper}>
          <Title>Sector Performance</Title>
          <Text mb={"md"}>
            Data last updated as of 3PM EDT {new Date().getDate()}/
            {new Date().getMonth()}/{new Date().getFullYear()}
          </Text>
          <ScrollArea>
            <DataTable
              withBorder
              borderRadius="sm"
              withColumnBorders
              striped
              highlightOnHover
              records={[...rows]}
              columns={[
                {
                  accessor: "Sector",
                  render: ({ sector }) => <Text weight={700}>{sector}</Text>,
                },
                {
                  accessor: "change",
                  textAlignment: "right",
                  render: ({ change }) => (
                    <Text
                      weight={700}
                      color={change.includes("-") ? "red" : "green"}
                    >
                      {change}
                    </Text>
                  ),
                },
              ]}
            />
          </ScrollArea>
          <Divider mt={"md"} />
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
  wrapper.getServerSideProps((store) => async () => {
    const newsData = await store.dispatch(fetchSectorNews());
    const returnNews: StockNews = newsData.payload;

    return {
      props: {
        news: returnNews ? returnNews : [],
      },
    };
  });

export default SectorPerformance;
