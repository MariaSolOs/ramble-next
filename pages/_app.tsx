import { useEffect } from 'react';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import { LanguageProvider } from 'context/languageContext';
import { UiProvider } from 'context/uiContext';
import apolloClient from 'apollo-client';

import Navbar from 'components/Navbar';
import { LogInDialog, SignUpDialog } from 'components/AuthDialogs';
import ErrorDialog from 'components/ErrorDialog';
import GlobalStyles from 'GlobalStyles';

const App = ({ Component, pageProps }: AppProps) => {
    // Remove the server-side injected CSS
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);
    
    return (
        <Provider session={pageProps.session}>
            <ApolloProvider client={apolloClient}>
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
            </ApolloProvider>
        </Provider>
    );
}

export default App;
