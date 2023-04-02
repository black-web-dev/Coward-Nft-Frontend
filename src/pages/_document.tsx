import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {

    return (
      <Html>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-WSWRTVLRTD"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WSWRTVLRTD');
            `,
            }}
          />
          <link rel="preload" href="/fonts/Carter_One/CarterOne-Regular.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Roman/RomanGridCaps.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Montserrat/Montserrat-VariableFont_wght.ttf" as="font" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
