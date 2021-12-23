import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { CreatedExperiencesProps } from './index';

import * as S from './CreatedExperiences.styled';

const CreatedExperiences = (props: CreatedExperiencesProps) => {
    const { CreatedExperiences: text } = useLanguageContext().appText;

    return (
        <>
            <S.Tip>{text.tip}</S.Tip>
            <S.Experiences>
                {props.experiences.map(exp =>
                    <S.Card
                    key={exp._id}
                    experience={exp}
                    linkTo={routes.editExperience(exp._id)} />
                )}
            </S.Experiences>
        </>
    );
}

export default CreatedExperiences;