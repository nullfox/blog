import { useEffect } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import '@fontsource/open-sans';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import { SiteSeo, configure } from '@nullfox/nextjs-blog';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import theme from '../theme';

type AppWindow = typeof window & {
  gtag: (t: string, id: string, opts?: Record<string, any>) => void;
};

configure({
  site: {
    hostname: 'http://localhost:3000',
    title: "Ben Fox's Blog",
    description:
      'Tips, tricks and guides for TypeScript, web application development and the cloud',
    image: 'http://localhost:3000/images/logo.png',
  },
  defaultAuthor: 'Ben Fox',
  authors: [
    {
      name: 'Ben Fox',
      twitter: '@thenullfox',
      linkedin: 'nullfox',
    },
  ],
  content: {
    paths: {
      content: './content',
      assets: './public',
    },
    mdx: {
      rehype: ['rehype-highlight'],
    },
  },
  rss: true,
});

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
      <SiteSeo />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
