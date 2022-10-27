import formatMoney from "@/utils/formatMoney";
import { Box, Card, Group, Text } from "@mantine/core";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { Result } from "typings/typings";

interface Props {
  data: Result;
  initialDeposit: number;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>): any => {
  if (active && payload && payload.length) {
    const inital = Number(payload[0].value);
    const deposits = Number(payload[1].value);
    const interest = Number(payload[2].value);

    const total = inital + deposits + interest;

    return (
      <Card shadow={"md"} p="lg" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Text>🚀 &nbsp; Month {label}</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text>Initial</Text>
          <Text>{formatMoney(inital)}</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text>Deposits</Text>
          <Text>{formatMoney(deposits)}</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text>Interest</Text>
          <Text>{formatMoney(interest)}</Text>
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text>Total</Text>
          <Text>{formatMoney(total)}</Text>
        </Group>
      </Card>
    );
  } else {
    return <>Nothing to render</>;
  }
};

const ResultChart: React.FC<Props> = ({ data, initialDeposit }) => {
  // Guard

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",
        marginTop: "20px",
        marginBottom: "20px",

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="yearNumber" />
          <YAxis tickFormatter={(value) => formatMoney(value)} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} />
          <Bar
            name="Initial deposit"
            dataKey="initialDeposit"
            stackId="a"
            fill="#1c4d78"
          />
          <Bar
            name="Regular deposits"
            dataKey="cumulativeRegularDeposits"
            stackId="a"
            fill="#3c83c2"
          />
          <Bar
            name="Interest"
            dataKey="cumulativeInterest"
            stackId="a"
            fill="#82ca9d"
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ResultChart;
