import * as S from './Spinner.styled';

const Spinner = () => (
    <S.Backdrop>
        <S.Ball sx={{ animationDelay: '-0.32s' }} />
        <S.Ball sx={{ animationDelay: '-0.16s' }} />
        <S.Ball />
    </S.Backdrop>
);

export default Spinner;