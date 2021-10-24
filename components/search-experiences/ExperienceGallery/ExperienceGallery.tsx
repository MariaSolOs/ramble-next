import routes from 'routes';
import useUserExperiences from 'hooks/useUserExperiences';
import type { ExperienceGalleryProps } from './index';

import Box from '@mui/material/Box';
import * as S from './ExperienceGallery.styled';

const ExperienceGallery = (props: ExperienceGalleryProps) => {
    const { isExperienceSaved, handleSavingToggle } = useUserExperiences();

    return (
        <S.Gallery component="div">
            {props.experiences.map((exp, index) => 
                <S.Transition
                key={exp._id}
                timeout={300}
                classNames={{
                    enter: 'card-fade-in',
                    enterActive: 'card-fade-in',
                    exit: 'card-fade-out',
                    exitActive: 'card-fade-out'
                }}>
                    <Box sx={{ transitionDelay: `${index * 70}ms` }}>
                        <S.Card
                        experience={exp}
                        linkTo={routes.experienceDetails(exp._id)}
                        isSaved={isExperienceSaved(exp._id)}
                        onHeartClick={() => handleSavingToggle(exp._id)} />
                    </Box>
                </S.Transition>
            )}
        </S.Gallery>
    );
}

export default ExperienceGallery;