import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";

import {
  Container,
  createStyles,
  Card,
  Text,
  TextInput,
  Title,
  Badge,
  Group,
} from "@mantine/core";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { NextLink } from "@mantine/next";

import { fetchNews } from "app/slices/stockSlice";
import { wrapper } from "app/store";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState } from "react";
import { StockNews } from "typings/typings";
import { fileURLToPath } from "url";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 30,
    paddingBottom: 60,
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

function NewCard({
  title,
  symbol,
  url,
}: {
  title: string;
  symbol: string;
  url: string;
}) {
  return (
    <Card
      component={NextLink}
      href={url}
      withBorder
      radius="md"
      p="xl"
      mt={"md"}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Group position="apart">
        <Text>{title}</Text>
        <Badge>{symbol}</Badge>
      </Group>
    </Card>
  );
}

const News: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { classes } = useStyles();
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const filtered = !search
    ? data
    : data.filter((value: StockNews) =>
        value.title?.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <>
      <Meta title="News" />
      <Layout>
        <Container className={classes.wrapper}>
          <Title mb={"md"}>Latest Stock News</Title>
          <TextInput
            label={"Search for news"}
            placeholder={"Enter the title.."}
            onChange={handleSearchChange}
          />

          {filtered?.map((item: StockNews) => (
            <NewCard
              title={item.title!}
              symbol={item.symbol!}
              url={item.url!}
            />
          ))}
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const data = await store.dispatch(fetchNews());
    const returnData = data.payload;

    return {
      props: {
        data: returnData ? returnData : [],
      },
    };
  });

export default News;
