import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { NextPage } from "next";
import { signIn } from "next-auth/react";

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
    <>
      <Meta title="Login" />

      <Layout>
        <Container className={classes.root}>
          <div className={classes.label}>Oops</div>
          <Title className={classes.title}>
            You have entered a locked space.
          </Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Unfortunately, this page requires you to be authenticated to
            continue!{" "}
          </Text>
          <Group position="center">
            <Button
              onClick={() => signIn("patreon")}
              variant="gradient"
              size="md"
            >
              Login
            </Button>
          </Group>
        </Container>
      </Layout>
    </>
  );
};

export default Page404;
