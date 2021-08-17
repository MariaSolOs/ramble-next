import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import type { DocumentContext } from 'next/document';

export default class CustomDocument extends Document {
    static async getInitialProps(context: DocumentContext) {
        /* Render app and page and get the context of the page with 
        collected side effects. */
        const sheets = new ServerStyleSheets();
        const originalRenderPage = context.renderPage;
        
        context.renderPage = () => originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App { ...props } />)
        });

        const initialProps = await Document.getInitialProps(context);

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish
            styles: [ 
                ...React.Children.toArray(initialProps.styles), 
                sheets.getStyleElement()
            ]
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="author" content="Maria Solano@Ramble" />
                    <link rel="canonical" href={process.env.RAMBLE_URL} />
                    <meta property="og:type" content="website" />
                    {/* Fallback font for Futura and for the error page */}
                    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@700&family=Questrial&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
} 