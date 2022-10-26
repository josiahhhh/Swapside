import { MantineProvider } from "@mantine/core";
import { wrapper } from "app/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import SEO from "../../next-seo.config";
import { DefaultSeo } from "next-seo";
import { Session } from "next-auth";

function MyApp({
  Component,
  pageProps,
  ...rest
}: AppProps<{
  session: Session;
}>) {
  const { store } = wrapper.useWrappedStore(rest);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <SessionProvider session={pageProps.session}>
        <DefaultSeo {...SEO} />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </MantineProvider>
  );
}

export default MyApp;
