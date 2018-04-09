import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { readFileSync } from 'fs';

let version = '';

// Clean browser css cache
if (process.env.NODE_ENV === 'production') {
  version = `?v=${readFileSync(`${process.cwd()}/src/.next/BUILD_ID`)}`;
}

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* Use normalize.css */}
          <link rel="stylesheet" href="/static/normalize.min.css" />
          <link rel="stylesheet" href={`/_next/static/style.css${version}`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
