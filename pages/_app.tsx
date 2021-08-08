import { useEffect } from 'react';
import { Provider as AuthProvider } from 'next-auth/client';
import type { AppProps } from 'next/app';

import { LanguageProvider } from 'context/languageContext';
import { UiProvider } from 'context/uiContext';

import Head from 'next/head';
import Navbar from 'components/Navbar';
import { LogInDialog, SignUpDialog } from 'components/AuthDialogs';
import ErrorDialog from 'components/ErrorDialog';
import GlobalStyles from 'GlobalStyles';

// Fixes the huge icon initial flash
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; 
config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
    // Remove the server-side injected CSS
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);
    
    return (
        <AuthProvider session={pageProps.session}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <LanguageProvider>
                <UiProvider>
                    <GlobalStyles>
                        <Navbar />
                        <LogInDialog />
                        <SignUpDialog />
                        <ErrorDialog />
                        <Component { ...pageProps } />
                    </GlobalStyles>
                </UiProvider>
            </LanguageProvider>
        </AuthProvider>
    );
}

export default App;
