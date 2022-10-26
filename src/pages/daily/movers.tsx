import Layout from '@/components/Global/Layout';
import { Meta } from '@/components/Global/Meta';
import Actives from '@/components/Movers/Active';
import Gainers from '@/components/Movers/Gainers';
import Losers from '@/components/Movers/Losers';
import { Container, Tabs, Text } from '@mantine/core';
import { IconCashBanknote, IconCashBanknoteOff, IconZoomMoney } from '@tabler/icons';
import { NextPage } from 'next';

const Movers: NextPage = () => {
  return (
    <Layout>
      <Meta title="Daily Movers" />

      <Container sx={{ paddingBottom: '40px;' }}>
        <Text size={42} weight="bold">
          Daily Movers
        </Text>
        <Tabs defaultValue="active" variant="outline" color={'cyan'} mt={'md'}>
          <Tabs.List>
            <Tabs.Tab value="active" icon={<IconZoomMoney size={14} />}>
              Most Traded
            </Tabs.Tab>
            <Tabs.Tab value="gainers" icon={<IconCashBanknote size={14} />}>
              Daily Gainers
            </Tabs.Tab>
            <Tabs.Tab value="losers" icon={<IconCashBanknoteOff size={14} />}>
              Daily Losers
            </Tabs.Tab>
          </Tabs.List>

          {/* Tabs Info */}
          <Tabs.Panel value="active" pt="md">
            <Actives />
          </Tabs.Panel>

          <Tabs.Panel value="gainers" pt="md">
            <Gainers />
          </Tabs.Panel>

          <Tabs.Panel value="losers" pt="md">
            <Losers />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Layout>
  );
};

export default Movers;
