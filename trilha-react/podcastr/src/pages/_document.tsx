import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyAppDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Lexend:wght@100;300;400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />{" "}
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
