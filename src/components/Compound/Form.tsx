import { Box, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Frequency, Strategy } from "typings/typings";

interface Props {
  handleSubmit: any;
  strategy: Strategy;
}

const Form: React.FC<Props> = ({ handleSubmit, strategy }) => {
  const frequency: Array<Frequency> = [
    "Annually",
    "Monthly",
    "Fortnightly",
    "Weekly",
    "Daily",
  ];

  const depositFrequency = frequency;
  const compoundFrequency = depositFrequency.slice(0, 2); // ["Annually", "Monthly"]

  const form = useForm({
    initialValues: {
      initialDeposit: "",
      regularDeposit: "",
      numberOfYears: "",
      annualInterestRate: "",
      depositFrequency: "Annually",
      compoundFrequency: "Annually",
    },

    validate: {
      initialDeposit: (value) => (Number(value) ? null : "Invalid number"),
      regularDeposit: (value) => (Number(value) ? null : "Invalid number"),
      numberOfYears: (value) => (Number(value) ? null : "Invalid number"),
      annualInterestRate: (value) => (Number(value) ? null : "Invalid number"),
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <NumberInput
          withAsterisk
          label="Starting Balance"
          onSubmit={handleSubmit}
          variant="filled"
          value={strategy.initialDeposit}
          {...form.getInputProps("initialDeposit")}
        />
        <NumberInput
          withAsterisk
          mt={"md"}
          label="Monthly Contribution"
          onSubmit={handleSubmit}
          variant="filled"
          value={strategy.regularDeposit}
          {...form.getInputProps("regularDeposit")}
        />
        <NumberInput
          withAsterisk
          mt={"md"}
          label="Number of Months"
          onSubmit={handleSubmit}
          type="number"
          value={strategy.numberOfYears}
          variant="filled"
          {...form.getInputProps("numberOfYears")}
        />
        <NumberInput
          withAsterisk
          mt={"md"}
          label="Interest Rate"
          onSubmit={handleSubmit}
          variant="filled"
          value={strategy.annualInterestRate}
          {...form.getInputProps("annualInterestRate")}
        />
        <Button mt={"md"} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Form;
