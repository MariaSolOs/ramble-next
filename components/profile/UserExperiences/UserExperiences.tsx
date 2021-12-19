import routes from 'routes';
import type { UserExperiencesProps } from './index';

import * as S from './UserExperiences.styled';

const UserExperiences = (props: UserExperiencesProps) => (
    <>
        <S.Title>{props.title}</S.Title>
        <S.CardsRow>
            {props.experiences.map(exp =>
                <S.Card
                key={exp._id}
                experience={exp}
                linkTo={routes.experienceDetails(exp._id)} />
            )}
        </S.CardsRow>
    </>
);

export default UserExperiences;