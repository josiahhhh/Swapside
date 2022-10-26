import { Box, Button, NativeSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Frequency, Strategy } from "typings/typings";

interface Props {
  handleSubmit: any;
  strategy: Strategy;
}

const Form: React.FC<Props> = ({ handleSubmit, strategy }) => {
  const frequency: Array<Frequency> = ["Monthly"];
  const depositFrequency = frequency;

  const form = useForm({
    initialValues: {
      startingBalance: "",
      monthlyContribution: "",
      depositFrequency: "",
      compoundFrequency: "",
      numberOfMonths: "",
      returnRate: "",
    },

    validate: {
      startingBalance: (value) => (Number(value) ? null : "Invalid number"),
      monthlyContribution: (value) => (Number(value) ? null : "Invalid number"),
      numberOfMonths: (value) => (Number(value) ? null : "Invalid number"),
      returnRate: (value) => (Number(value) ? null : "Invalid number"),
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Starting Balance"
          onSubmit={handleSubmit}
          value={(strategy.startingBalance / 100).toFixed(2)}
          {...form.getInputProps("startingBalance")}
        />
        <TextInput
          withAsterisk
          mt={"md"}
          label="Monthly Contribution"
          onSubmit={handleSubmit}
          value={(strategy.monthlyContribution / 100).toFixed(2)}
          {...form.getInputProps("monthlyContribution")}
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
          data={depositFrequency.map((d) => d)}
          placeholder="Pick one"
          label="Compound Frequency"
          variant="filled"
          withAsterisk
          {...form.getInputProps("compoundFrequency")}
        />
        <TextInput
          withAsterisk
          mt={"md"}
          label="Number of Months"
          onSubmit={handleSubmit}
          value={strategy.numberOfMonths}
          {...form.getInputProps("numberOfMonths")}
        />
        <TextInput
          withAsterisk
          mt={"md"}
          label="Rate of Return (Monthly)"
          onSubmit={handleSubmit}
          value={(strategy.returnRate / 100).toFixed(2)}
          {...form.getInputProps("returnRate")}
        />
        <Button mt={"md"} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Form;
