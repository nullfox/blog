import { ChakraProvider } from '@chakra-ui/react';

import '@fontsource/open-sans';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';

import theme from '../theme';

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider resetCSS theme={theme}>
    <DefaultSeo
      titleTemplate="Ben Fox | %s"
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: 'https://nullfox.com/',
        site_name: 'Ben Fox',
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

export default App;
