import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import {
  Button,
  Container,
  createStyles,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";

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

const History: NextPage = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      search: "",
    },
    validate: {
      search: (value) => {
        if (value.length < 5) {
          return "Search must be at least 5 characters";
        }
      },
    },
  });

  return (
    <>
      <Meta title="History" />

      <Layout>
        <div className={classes.wrapper}>
          <Container size={1200} className={classes.inner}>
            <form
              onSubmit={form.onSubmit((values) => {
                router.push(`/exchange/${values.search}`);
              })}
            >
              <Title align={"center"}>
                Look at the history of your transactions
              </Title>
              <TextInput
                placeholder="Search"
                icon={<IconSearch />}
                {...form.getInputProps("search")}
              />
              <Button type={"submit"} mt={"sm"} fullWidth>
                Search
              </Button>
            </form>
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default History;
