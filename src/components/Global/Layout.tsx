import { AppShell } from '@mantine/core';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { variants } from 'utils/variants';
import { FooterLinks } from '../Footer';
import { data } from '../Footer/footerLinks';
import Navbar from '../Navbar/Navbar';
import { links } from '../Navbar/navLinks';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <AppShell padding="md" header={<Navbar links={links} />} footer={<FooterLinks data={data} />}>
        <motion.main
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: 'linear' }}
          variants={variants}>
          {children}
        </motion.main>
      </AppShell>
    </>
  );
};

export default Layout;
