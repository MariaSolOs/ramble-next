import React from 'react';
import { Provider as AuthProvider } from 'next-auth/client';
import { Elements } from '@stripe/react-stripe-js';
import { CacheProvider } from '@emotion/react';

import { LanguageContextProvider } from 'context/languageContext';
import { UiContextProvider } from 'context/uiContext';
import { UserContextProvider } from 'context/userContext';
import { getStripe } from 'lib/client-stripe';
import createEmotionCache from 'styles/emotion-cache';
import type { AppProps } from 'models/application';

import Head from 'next/head';
import GlobalLayout from 'components/GlobalLayout';

// Fullcalendar styles
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

// Fixes the huge icon initial flash
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; 
config.autoAddCss = false;

const clientEmotionCache = createEmotionCache();

const App = (props: AppProps) => {
    const { Component, pageProps, emotionCache = clientEmotionCache } = props;
    const PageLayout = Component.layout || React.Fragment;
    
    return (
        <AuthProvider session={pageProps.session}>
            <CacheProvider value={emotionCache}>
                {/* Viewport tag needs to be here, not in _document */}
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <LanguageContextProvider>
                    <UiContextProvider>
                        <UserContextProvider>
                            <GlobalLayout>
                                <PageLayout>
                                    {/* Add Stripe elements to the booking page only. */}
                                    {Component.displayName === 'BookExperiencePage' ?
                                        <Elements stripe={getStripe()}>
                                            <Component { ...pageProps } />
                                        </Elements> :
                                        <Component { ...pageProps } />}
                                </PageLayout>
                            </GlobalLayout>
                        </UserContextProvider>
                    </UiContextProvider>
                </LanguageContextProvider>
            </CacheProvider>
        </AuthProvider>
    );
}

export default App;
