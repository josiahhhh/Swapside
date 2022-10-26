import Form from "@/components/Compound/Form";
import ResultChart from "@/components/Compound/Result";
import Layout from "@/components/Global/Layout";
import { Meta } from "@/components/Global/Meta";
import { calculateCompoundInterest } from "@/utils/compound";
import { Box, Container, createStyles, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Result, Strategy } from "typings/typings";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 10,
    paddingBottom: 20,
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
  inner: {
    position: "relative",
    zIndex: 1,
  },
}));

const defaultStrategy: Strategy = {
  initialDeposit: 11, // in cents
  regularDeposit: 2000, // in cents
  depositFrequency: "Annually",
  compoundFrequency: "Annually",
  numberOfYears: 10,
  annualInterestRate: 500,
};

const CompoundInterest: NextPage = () => {
  const { classes } = useStyles();
  const [strategy, setStrategy] = useState<Strategy>(defaultStrategy);
  const [result, setResult] = useState<Result>();

  const handleSubmit = (data: any) => {
    console.log(data);

    setStrategy({
      ...strategy,
      ...data,
    });
  };

  useEffect(() => {
    const result = calculateCompoundInterest(strategy);

    setResult(result);
  }, [strategy]);

  return (
    <Layout>
      <Meta title="Compound Interest Calculator" />

      <Container className={classes.wrapper}>
        <Title align={"center"}>Compound Interest Calculator</Title>
        <div className={classes.inner}>
          <Text align={"center"} mb={"md"}>
            Start calculating to help save better!
          </Text>
          <Form handleSubmit={handleSubmit} strategy={strategy} />
        </div>
        <div>
          <ResultChart data={result} initialDeposit={strategy.initialDeposit} />
        </div>
      </Container>
    </Layout>
  );
};

export default CompoundInterest;
