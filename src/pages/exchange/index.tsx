import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import getCurrencies, {
  compareExchangeRates,
  createTransaction,
  getExchangeRates,
} from "@/utils/fetch";
import {
  Badge,
  Button,
  Card,
  Container,
  createStyles,
  Divider,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Strategy {
  from: string;
  to: string;
  amount: number;
  address: string;
}

const defaultStrategy: Strategy = {
  from: "btc",
  to: "eth",
  amount: 0.34,
  address: "",
};

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  select: {
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.sm,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
  },

  inner: {
    position: "relative",
    paddingTop: 35,
    paddingBottom: 10,

    ["@media (max-width: 755px)"]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },
}));

const Exchange: NextPage = () => {
  const { classes } = useStyles();
  const [error, setError] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [rate, setRate] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      from: defaultStrategy.from,
      to: defaultStrategy.to,
      amount: defaultStrategy.amount,
      address: defaultStrategy.address,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      getCurrencies()
        .then((res) => {
          if (res.data) {
            setCurrencies(res.data);
          } else {
            setError("No currencies found");
          }
        })
        .catch((err) => {
          setError(err.message);
        });

      getExchangeRates(form.values.to).then((res) => {
        if (res.data) {
          setRate(res.data.data.rates["USD"]);
        } else {
          setError("No exchange rates found");
        }
      });
    };

    compareExchangeRates(
      form.values.amount,
      form.values.from,
      form.values.to
    ).then((res) => {
      if (res.data) {
        setExchangeRate(res.data.estimatedAmount);
      } else {
        setError("No exchange rates found");
      }
    });

    fetchData();
  }, []);

  return (
    <>
      <Meta title="Exchange" />

      <Layout>
        <div className={classes.wrapper}>
          <Container className={classes.inner}>
            <form
              onSubmit={form.onSubmit((values) => {
                createTransaction(values)
                  .then((res) => {
                    if (res.status === 200) {
                      router.push(`/exchange/${res.data.id}`);
                    } else {
                      setError("Something went wrong");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    setError(err.message);
                  });
              })}
            >
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Badge mb={"lg"}>Exchange Now</Badge>
                <TextInput
                  label="You Send"
                  placeholder={`0.34 ${defaultStrategy.from}`}
                  size={"md"}
                  classNames={classes}
                  rightSectionWidth={42}
                  {...form.getInputProps("amount")}
                  required
                />
                <Divider mt={"sm"} size={"sm"} />
                <Text my={"sm"} color={"dimmed"}>
                  1 {form.values.to} = {rate}{" "}
                </Text>
                <Divider mt={"sm"} size={"sm"} />
                <TextInput
                  mt={"md"}
                  label="You Get"
                  placeholder="0.0000"
                  classNames={classes}
                  value={exchangeRate}
                />
                <Group position="apart">
                  <Select
                    style={{ marginTop: 20, zIndex: 2 }}
                    data={currencies.map((currency: any) => ({
                      label: currency.name,
                      value: currency.ticker,
                    }))}
                    placeholder="Select a cryptocurrency"
                    label="Exchange"
                    searchable
                    defaultValue={"Bitcoin"}
                    classNames={classes}
                    value={defaultStrategy.from}
                    {...form.getInputProps("from")}
                  />
                  <Select
                    style={{ marginTop: 20, zIndex: 2 }}
                    data={currencies.map((currency: any) => ({
                      label: currency.name,
                      value: currency.ticker,
                    }))}
                    placeholder="Select a cryptocurrency"
                    label="For"
                    searchable
                    classNames={classes}
                    {...form.getInputProps("to")}
                  />
                </Group>
                <Divider mt={"sm"} size={"sm"} />
                <Group mt={"md"}>
                  <IconAlertCircle />
                  <Text color={"dimmed"}>
                    Please be careful not to provide a smart contract as your{" "}
                    <Badge color="red">{form.values.to}</Badge>
                  </Text>
                </Group>
                <TextInput
                  mt={"lg"}
                  label={`Enter the recipient’s ${form.values.to.toUpperCase()} address`}
                  classNames={classes}
                  {...form.getInputProps("address")}
                />
                <Button
                  disabled={error ? true : false}
                  color={`${error ? "red" : "green"}`}
                  mt={"md"}
                  fullWidth
                  type="submit"
                >
                  {error ? "Improper Address" : "Exchange"}
                </Button>
              </Card>
            </form>
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default Exchange;
