import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import { Button, Container, createStyles, Group, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconPhone } from "@tabler/icons";
import { NextPage } from "next";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
  },

  inner: {
    position: "relative",
    paddingTop: 130,
    paddingBottom: 10,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

const HomePage: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Meta title="Home" />

      <Layout>
        <div className={classes.wrapper}>
          <Container className={classes.inner}>
            <h1 className={classes.title}>
              An{" "}
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
                inherit
              >
                exchanger
              </Text>{" "}
              for Cryptocurrency
            </h1>

            <Text className={classes.description} color="dimmed">
              Exchange your crypto for another one in a few clicks, no
              registration required with our fast exchange service.
            </Text>

            <Group className={classes.controls}>
              <Button
                component={NextLink}
                size="xl"
                className={classes.control}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
                href={"/exchange"}
              >
                Get exchanging
              </Button>

              <Button
                component={NextLink}
                href={"/contact"}
                size="xl"
                variant="default"
                className={classes.control}
                leftIcon={<IconPhone size={20} />}
              >
                Contact
              </Button>
            </Group>
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
