import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import type { DocumentContext } from 'next/document';

export default class Document extends NextDocument {
    static async getInitialProps(context: DocumentContext) {
        /* Render app and page and get the context of the page with 
        collected side effects. */
        const sheets = new ServerStyleSheets();
        const originalRenderPage = context.renderPage;
        
        context.renderPage = () => originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App { ...props } />)
        });

        const initialProps = await NextDocument.getInitialProps(context);

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
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
} 