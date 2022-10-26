import Layout from '@/components/Global/Layout';
import { Meta } from '@/components/Global/Meta';
import { Box, Container, createStyles, Text } from '@mantine/core';
import { NextPage } from 'next';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 50
  },
  text: {
    fontWeight: 'bold',
    fontSize: '40px',
    textAlign: 'center'
  }
}));

const Economic: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <Meta title="Economic Calendar" />

      <Container className={classes.wrapper}>
        <Text size={'lg'} className={classes.text}>
          Economic Calendar
        </Text>
        <Box>
          <iframe
            id="Economic_Calendar"
            src="https://s.tradingview.com/embed-widget/events/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22width%22%3A%22510%22%2C%22height%22%3A%22600%22%2C%22importanceFilter%22%3A%220%2C1%22%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22events%22%7D"
            width="100%"
            height="550"
            frameBorder={0}
            scrolling="no"
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default Economic;
