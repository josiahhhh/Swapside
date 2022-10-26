import {
  Button,
  Container,
  createStyles,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 1,
    paddingBottom: theme.spacing.xl * 4
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0
    }
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28
    }
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1
    }
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px'
  }
}));

export function Hero() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>freemium</span> Stock <br /> website for
              everyone
            </Title>
            <Text color="dimmed" mt="md">
              We’re different. Bringing cavemen into the 21st century!
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }>
              <List.Item>
                <b>Stock Sentiment</b> – get the latest sentiment information avaibale
              </List.Item>
              <List.Item>
                <b>Cheaper than others</b> – one of the cheapest easy to use on the market
              </List.Item>
              <List.Item>
                <b>No nonsense</b> – get straight into diving to the infromation
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="md" size="md" className={classes.control}>
                Get started
              </Button>
              <Button variant="default" radius="md" size="md" className={classes.control}>
                Pricing
              </Button>
            </Group>
          </div>
          <Image
            src={'https://shuffle.dev/flaro-assets/images/headers/header.png'}
            className={classes.image}
            alt="Header Image"
          />
        </div>
      </Container>
    </div>
  );
}
