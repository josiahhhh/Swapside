import { createStyles, Group, Paper, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconArrowDown, IconArrowUp } from '@tabler/icons';
import useSWR from 'swr';
import { StockMovers } from 'typings/typings';
import fetcher from 'utils/fetcher';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center'
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase'
  }
}));

function StockCard({ symbol, price, change, changesPercentage }: StockMovers) {
  const { classes } = useStyles();

  return (
    <Paper component={NextLink} href={`/stocks/${symbol}`} withBorder radius="md" p="xs">
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          {symbol}
        </Text>
        <ThemeIcon
          color="gray"
          variant="light"
          sx={(theme) => ({
            color: changesPercentage > 0 ? theme.colors.teal[6] : theme.colors.red[6]
          })}
          size={38}
          radius="md">
          {changesPercentage > 0 ? (
            <IconArrowUp size={28} stroke={1.5} />
          ) : (
            <IconArrowDown size={28} stroke={1.5} />
          )}
        </ThemeIcon>
      </Group>
      <Group align="flex-end" spacing="xs" mt={25}>
        <Text className={classes.value}>${Math.round(price * 100) / 100}</Text>
        <Text color={change > 0 ? 'teal' : 'red'} size="sm" weight={500} className={classes.diff}>
          <span>{Math.round(changesPercentage * 100) / 100}%</span>
        </Text>
      </Group>
      <Text size="xs" color="dimmed" mt={7}>
        Compared to previous day
      </Text>
    </Paper>
  );
}

const Gainers = () => {
  const { data, error } = useSWR<StockMovers[]>('/api/v2/gainers', fetcher, {
    refreshInterval: 2000
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);

  return (
    <div>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 }
        ]}>
        {data.map((stock, index) => (
          <StockCard
            symbol={stock.symbol}
            name={stock.name}
            price={stock.price}
            change={stock.change}
            changesPercentage={stock.changesPercentage}
            key={index}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Gainers;
