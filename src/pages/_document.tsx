import { ColorModeScript } from '@chakra-ui/react';

import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/css/syntax.css"></link>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-06MZCKWRQ9"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-06MZCKWRQ9', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
