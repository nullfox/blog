import { useEffect } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import '@fontsource/open-sans';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import theme from '../theme';

type AppWindow = typeof window & {
  gtag: (t: string, id: string, opts?: Record<string, any>) => void;
};

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      (window as AppWindow).gtag('config', 'G-06MZCKWRQ9', {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <link rel="shortcut icon" href="/images/logo.png" />
      </Head>
      <DefaultSeo
        titleTemplate="%s | Ben Fox's Blog"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://www.nullfox.com/',
          site_name: "Ben Fox's Blog",
        }}
        twitter={{
          handle: '@thenullfox',
          site: '@thenullfox',
          cardType: 'summary',
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
