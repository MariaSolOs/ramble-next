import React from 'react';

import type { CalendarLayoutProps } from './index';

import * as S from './CalendarLayout.styled';

const CalendarLayout: React.FC<CalendarLayoutProps> = (props) => (
    <S.Container>
        {props.CalendarComponent}
        {props.useMobileLayout ?
            props.children :
            <S.InfosContainer>
                {props.children}
            </S.InfosContainer>}
    </S.Container>
);

export default CalendarLayout;