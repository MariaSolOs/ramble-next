import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import type { DocumentContext } from 'next/document';

import createEmotionCache from 'styles/emotion-cache';

export default class CustomDocument extends Document {
    static async getInitialProps(context: DocumentContext) {
        const originalRenderPage = context.renderPage;

        const cache = createEmotionCache();
        const { extractCriticalToChunks } = createEmotionServer(cache);

        context.renderPage = () => originalRenderPage({
            // eslint-disable-next-line react/display-name
            enhanceApp: (App: any) => props => <App emotionCache={cache} { ...props } />
        });

        const initialProps = await Document.getInitialProps(context);
        const emotionStyles = extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map(style => 
            <style
            key={style.key}
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: style.css }} />
        );

        return {
            ...initialProps,
            styles: [
                ...React.Children.toArray(initialProps.styles),
                ...emotionStyleTags
            ]
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="author" content="Maria Solano@Ramble" />
                    <link rel="canonical" href={process.env.RAMBLE_URL} />
                    <meta property="og:type" content="website" />

                    {/* Supported languages */}
                    <link rel="alternate" hrefLang="en" href={`${process.env.RAMBLE_URL}`} />
                    <link rel="alternate" hrefLang="fr" href={`${process.env.RAMBLE_URL}`} />

                    {/* PWA stuff */}
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#000000" />
                    <meta name="msapplication-TileColor" content="#B91D47" />
                    <meta name="theme-color" content="#000000" />

                    {/* Fallback font for Futura and Questrial */}
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