import { useEffect } from 'react';
import type { AppProps } from 'next/app';

import AppBar from 'components/AppBar';
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
        <GlobalStyles>
            <AppBar />
            <Component { ...pageProps } />
        </GlobalStyles>
    );
}

export default App;
