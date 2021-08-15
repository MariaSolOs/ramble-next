import React, { useEffect } from 'react';
import { Provider as AuthProvider } from 'next-auth/client';
import { Elements } from '@stripe/react-stripe-js';

import { LanguageProvider } from 'context/languageContext';
import { UiProvider } from 'context/uiContext';
import { getStripe } from 'lib/client-stripe';
import type { AppProps } from 'models/application';

import Head from 'next/head';
import Navbar from 'components/Navbar';
import { LogInDialog, SignUpDialog } from 'components/AuthDialogs';
import ErrorDialog from 'components/ErrorDialog';
import Snackbar from 'components/Snackbar';
import GlobalStyles from 'GlobalStyles';

// Fullcalendar styles
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

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

    const PageLayout = Component.layout || React.Fragment;
    
    return (
        <AuthProvider session={pageProps.session}>
            <Head>
                <meta name="vi ewport" content="width=device-width, initial-scale=1" />
            </Head>
            <LanguageProvider>
                <UiProvider>
                    <GlobalStyles>
                        <Navbar />
                        <LogInDialog />
                        <SignUpDialog />
                        <ErrorDialog />
                        <Snackbar />
                        <PageLayout>
                            {/* Add Stripe elements to the booking page only. */}
                            {Component.displayName === 'BookExperiencePage' ?
                                <Elements stripe={getStripe()}>
                                    <Component { ...pageProps } />
                                </Elements> :
                                <Component { ...pageProps } />}
                        </PageLayout>
                    </GlobalStyles>
                </UiProvider>
            </LanguageProvider>
        </AuthProvider>
    );
}

export default App;
