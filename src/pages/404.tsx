import Layout from "@/components/Global/Layout";
import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const Page404: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>
          You have entered a secret space.
        </Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          Unfortunately, this page does not exist. You may have mistyped the
          address, or the page has been moved.
        </Text>
        <Group position="center">
          <Link href="/" legacyBehavior>
            <Button variant="gradient" size="md">
              Head home
            </Button>
          </Link>
        </Group>
      </Container>
    </Layout>
  );
};

export default Page404;
