import useLanguageContext from 'context/languageContext';
import type { Page } from 'models/application';

import Error from 'components/Error';

const Error404Page: Page = () => {
    const { ErrorPage: text } = useLanguageContext().appText;

    return (
        <Error
        statusCode={404}
        title={text.title}
        message={text.pageNotFound}
        buttonText={text.goBackButton} />
    );
}

Error404Page.displayName = 'Error404Page';

export default Error404Page;
  