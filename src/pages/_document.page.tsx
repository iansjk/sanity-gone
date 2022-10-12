import Document, { Html, Head, Main, NextScript } from "next/document";
import { mediaStyle } from "../Media";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
            rel="stylesheet"
          />
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyle }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
