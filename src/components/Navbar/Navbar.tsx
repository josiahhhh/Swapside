// @ts-ignore

import {
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  Menu,
  Stack,
  Text,
  Transition,
} from "@mantine/core";

import { useDisclosure, useScrollLock } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FaChevronDown } from "react-icons/fa";

const useStyles = createStyles((theme) => ({
  bgBlur: {
    background: theme.fn.rgba(theme.colors.dark[7], 0.7),
    backdropFilter: "blur(8px)",
  },

  header: {
    height: "80px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  linksDesktop: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  linksMobile: {
    position: "fixed",
    inset: 0,
    top: "80px",
    zIndex: 100,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  linkItem: {
    borderRadius: theme.radius.md,
    border: "1px solid transparent",
    color: theme.colors.dark[0],
    display: "block",
    fontSize: theme.fontSizes.md,
    lineHeight: 1,
    padding: "8px 12px",
    textDecoration: "none",
    transition: "100ms",

    "&:hover": {
      backgroundColor: theme.colors.dark[6],
      borderColor: theme.colors.dark[5],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  linkItemMobile: { padding: "12px 16px" },

  linkItemActive: {
    borderColor: theme.colors.red[6],
    color: theme.colors.red[6],
  },
}));

interface NavProps {
  links: {
    url: string;
    label: string;
    dropdown?: { link: string; label: string }[];
  }[];
}

const Navbar = ({ links }: NavProps) => {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const { classes, cx } = useStyles();
  const { data: session } = useSession();

  const items = links.map((link) => {
    const menuItems = link.dropdown?.map((item) => (
      <Menu.Item component={NextLink} href={item.link} key={item.link}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.url}
              className={classes.linkItem}
              onClick={(event) => event.preventDefault()}
            >
              <span className={classes.linkLabel}>{link.label}</span>
              <FaChevronDown size={12} />
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <NextLink
        key={link.label}
        className={cx(classes.linkItem, classes.linkItemMobile, {
          [classes.linkItemActive]: router.asPath === link.url,
        })}
        href={link.url}
      >
        {link.label}
      </NextLink>
    );
  });

  return (
    <>
      <Header
        height={65}
        mt={2}
        p={"xs"}
        className={cx(classes.header, classes.bgBlur)}
      >
        <Container className={classes.inner}>
          <Group>
            <Burger
              className={classes.burger}
              size="sm"
              opened={opened}
              onClick={() => {
                toggle();
                setScrollLocked((locked) => !locked);
              }}
            />
            <Text component={NextLink} href="/" size={"xl"} weight={"bold"}>
              CavemanAlerts
            </Text>
          </Group>

          <Group itemType="nav" spacing={8} className={classes.linksDesktop}>
            {items}
          </Group>

          <Button onClick={() => signIn("patreon")} color={"blue"} size={"sm"}>
            Login
          </Button>
        </Container>
      </Header>

      <Transition transition="slide-right" duration={300} mounted={opened}>
        {(styles) => (
          <Container
            className={cx(classes.linksMobile, classes.bgBlur)}
            style={styles}
          >
            <Stack itemType="nav" spacing={8}>
              {items}
            </Stack>
          </Container>
        )}
      </Transition>
    </>
  );
};

export default Navbar;
