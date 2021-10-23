import routes from 'routes';
import useUserExperiences from 'hooks/useUserExperiences';
import useLanguageContext from 'context/languageContext';
import type { FeaturedExperiencesProps } from './index';

import * as S from './FeaturedExperiences.styled';

const FeaturedExperiences = (props: FeaturedExperiencesProps) => {
    const { Home: text } = useLanguageContext().appText;
    const { isExperienceSaved, handleSavingToggle } = useUserExperiences();

    return (
        <>  
            <S.Divider />
            <S.Container>
                <S.Title>{text.discoverTitle}</S.Title>
                <S.Cards>
                    {props.experiences.map(exp => 
                        <S.Card
                        key={exp._id}
                        experience={exp}
                        linkTo={routes.experienceDetails(exp._id)}
                        isSaved={isExperienceSaved(exp._id)}
                        onHeartClick={() => handleSavingToggle(exp._id)} />
                    )}
                </S.Cards>
            </S.Container>
            <S.SearchButton 
            variant="experience" 
            link={routes.experienceSearch('Montréal, Canada', '2')}>
                {text.seeAllButton}
            </S.SearchButton>
        </>
    );
}

export default FeaturedExperiences;