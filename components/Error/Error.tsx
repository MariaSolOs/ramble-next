import routes from 'routes';
import type { ErrorProps } from './index';

import * as S from './Error.styled';

const Error = (props: ErrorProps) => (
    <S.Main>
        <S.StatusCode>{props.statusCode}</S.StatusCode>
        <S.WhiteTitle>{props.title}</S.WhiteTitle>
        <S.GreyTitle>{props.message}</S.GreyTitle>
        <S.Button link={routes.home} variant="error">{props.buttonText}</S.Button>
    </S.Main>
);

export default Error;