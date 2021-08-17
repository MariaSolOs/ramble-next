import useLanguageContext from 'context/languageContext';
import type { Page } from 'models/application';

import Error from 'components/Error';

type Props = {
    statusCode?: number;
}

const ErrorPage: Page<Props> = (props) => {
    const { ErrorPage: text } = useLanguageContext().appText;

    return (
        <Error
        statusCode={props.statusCode}
        title={text.title}
        message={text.genericError}
        buttonText={text.goBackButton} />
    );
}

ErrorPage.displayName = 'ErrorPage';
ErrorPage.getInitialProps = ({ res, err }): Props => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode }
}

export default ErrorPage;
  