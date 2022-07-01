// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Curiosidades Candidatos 2022</title>
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument