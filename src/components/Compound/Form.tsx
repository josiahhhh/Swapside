import { Strategy, Frequency } from "typings/typings";
import { Box, Button, NativeSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

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
      depositFrequency: "",
      compoundFrequency: "",
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
        <TextInput
          withAsterisk
          label="Initial Deposit"
          onSubmit={handleSubmit}
          value={(strategy.initialDeposit / 100).toFixed(2)}
          {...form.getInputProps("initialDeposit")}
        />
        <TextInput
          withAsterisk
          mt={"md"}
          label="Regular Deposit"
          onSubmit={handleSubmit}
          value={(strategy.regularDeposit / 100).toFixed(2)}
          {...form.getInputProps("regularDeposit")}
        />
        <NativeSelect
          mt={"md"}
          data={depositFrequency.map((d) => d)}
          placeholder="Pick one"
          label="Deposit Frequency"
          variant="filled"
          withAsterisk
          {...form.getInputProps("depositFrequency")}
        />
        <NativeSelect
          mt={"md"}
          data={compoundFrequency.map((d) => d)}
          placeholder="Pick one"
          label="Compound Frequency"
          variant="filled"
          withAsterisk
          {...form.getInputProps("compoundFrequency")}
        />
        <TextInput
          withAsterisk
          mt={"md"}
          label="Number of years"
          onSubmit={handleSubmit}
          value={strategy.numberOfYears}
          {...form.getInputProps("numberOfYears")}
        />
        <TextInput
          withAsterisk
          mt={"md"}
          label="Annual interest rate"
          onSubmit={handleSubmit}
          value={(strategy.annualInterestRate / 100).toFixed(2)}
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
