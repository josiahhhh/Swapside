import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import { Badge, Card, Container, createStyles, Text } from "@mantine/core";
import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
  },

  inner: {
    position: "relative",
    paddingTop: 130,
    paddingBottom: 10,

    ["@media (max-width: 755px)"]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const Id: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { classes } = useStyles();

  return (
    <>
      <Meta title="Exchange" />

      <Layout>
        <div className={classes.wrapper}>
          <Container className={classes.inner}>
            <Card withBorder radius="md" p="md" className={classes.card}>
              <Card.Section className={classes.section} py={"lg"} mt="md">
                <Badge mb={"md"}>{data.status}</Badge>
                <Text sx={{ fontSize: 24 }}>
                  Send {data.expectedSendAmount}{" "}
                  {data.fromCurrency.toUpperCase()}
                </Text>
                <Text size="lg" weight={500}>
                  To: {data.payinAddress}
                </Text>
              </Card.Section>
              <Card.Section className={classes.section} py={"lg"} mt="md">
                <Text sx={{ fontSize: 24 }}>
                  You get: {data.expectedReceiveAmount}{" "}
                  {data.toCurrency.toUpperCase()}
                </Text>
                <Text size="lg" weight={500}>
                  To: {data.payoutAddress}
                </Text>
              </Card.Section>
            </Card>
          </Container>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const { data } = await axios.get(`http://localhost:3000/api/order?id=${id}`);

  if (!data) {
    return {
      props: {},
    };
  }

  return {
    props: {
      data: data ? data : [],
    },
  };
};

export default Id;
