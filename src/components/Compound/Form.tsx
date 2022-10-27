import { Box, Button, NativeSelect, NumberInput } from "@mantine/core";
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
          label="Initial Deposit"
          onSubmit={handleSubmit}
          variant="filled"
          value={strategy.initialDeposit}
          {...form.getInputProps("initialDeposit")}
        />
        <NumberInput
          withAsterisk
          mt={"md"}
          label="Regular Deposit"
          onSubmit={handleSubmit}
          variant="filled"
          value={strategy.regularDeposit}
          {...form.getInputProps("regularDeposit")}
        />
        <NativeSelect
          mt={"md"}
          data={depositFrequency.map((d) => d)}
          placeholder="Pick one"
          label="Deposit Frequency"
          variant="filled"
          withAsterisk
          required
          {...form.getInputProps("depositFrequency")}
        />
        <NativeSelect
          mt={"md"}
          data={compoundFrequency.map((d) => d)}
          placeholder="Pick one"
          label="Compound Frequency"
          variant="filled"
          withAsterisk
          required
          {...form.getInputProps("compoundFrequency")}
        />
        <NumberInput
          withAsterisk
          mt={"md"}
          label="Number of years"
          onSubmit={handleSubmit}
          type="number"
          value={strategy.numberOfYears}
          variant="filled"
          {...form.getInputProps("numberOfYears")}
        />
        <NumberInput
          withAsterisk
          mt={"md"}
          label="Annual interest rate"
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
