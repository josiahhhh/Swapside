import { ActionIcon, Container, createStyles, SimpleGrid, Text, Title } from '@mantine/core';
import { FaCalculator, FaChartArea, FaChartBar, FaNewspaper } from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 80,
    paddingBottom: 80
  },

  item: {
    display: 'flex'
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md
  },

  itemTitle: {
    marginBottom: theme.spacing.xs / 2
  },

  supTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    letterSpacing: 0.5,

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left'
    }
  },

  title: {
    lineHeight: 1,
    textAlign: 'center',
    marginTop: theme.spacing.xl,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left'
    }
  },

  description: {
    textAlign: 'center',
    marginTop: theme.spacing.xs,

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left'
    }
  },

  highlight: {
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    padding: 5,
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: 'inline-block',
    color: theme.colorScheme === 'dark' ? theme.white : 'inherit'
  }
}));

const featureList = [
  {
    icon: <FaCalculator />,
    title: 'Options Profit Calculator',
    description: 'Something in prgoress'
  },
  {
    icon: <FaNewspaper />,
    title: 'Stock News',
    description: 'Something in prgoress'
  },
  {
    icon: <FaChartBar />,
    title: 'Sector Performance',
    description: 'See how each sector is performing daily.'
  },
  {
    icon: <FaChartArea />,
    title: 'Social Sentiment',
    description: 'Check the social sentiment of stock(s).'
  }
];

const Features = () => {
  const { classes } = useStyles();

  const items = featureList.map((item) => (
    <div className={classes.item} key={item.title}>
      <ActionIcon variant="light" className={classes.itemIcon} size={60} radius="md">
        {item.icon}
      </ActionIcon>

      <div>
        <Text weight={700} size="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text color="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <Container size={700} className={classes.wrapper}>
      <Text className={classes.supTitle}>Features</Text>

      <Title className={classes.title} order={2}>
        How we <span className={classes.highlight}>empower</span> our audience
      </Title>

      <Container size={660} p={0}>
        <Text color="dimmed" className={classes.description}>
          Check out our Latest Features
        </Text>
      </Container>

      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
        style={{ marginTop: 30 }}>
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
