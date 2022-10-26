import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import { Box, Container, createStyles, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import { Screener } from "react-ts-tradingview-widgets";

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

const StockScreener: NextPage = ({}) => {
  const { classes } = useStyles();

  return (
    <Layout>
      <Meta title="Stock Screener" />

      <Container className={classes.wrapper}>
        <Title>Stock Screener</Title>
        <Text>
          Temporary I had to remove my custom one, a new update to the package
          today broke auth and context manager.
        </Text>
        <Box mt={"lg"}>
          <Screener colorTheme="dark" width={1000} height={600} />
        </Box>
      </Container>
    </Layout>
  );
};

export default StockScreener;
