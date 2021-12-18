import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { SubmittedMessageProps } from './index';

import * as S from './SubmittedMessage.styled';

const SubmittedMessage = (props: SubmittedMessageProps) => {
    const { CreateExperience: text } = useLanguageContext().appText;

    return (
        <S.Container>
            <h1>{text.submittedTitle}</h1>
            <S.Message>
                {text.submittedMessage1} 
                <strong> {props.experienceTitle} </strong> 
                {text.submittedMessage2}  <br />
                {text.submittedMessage3}
            </S.Message>
            <S.Button variant="creator" link={routes.home}>
                {text.submittedButton}
            </S.Button>
        </S.Container>
    );
}

export default SubmittedMessage;