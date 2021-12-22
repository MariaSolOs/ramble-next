import React from 'react';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';

import Div100vh from 'react-div-100vh';
import NavLink from 'components/NavLink';
import * as S from './DashboardLayout.styled';

const DashboardLayout: React.FC = (props) => {
    const { CreatorDashboard_Layout: text } = useLanguageContext().appText;

    return (
        <Div100vh>
            <S.Container>
                <S.DashboardTitle>{text.dashboardTitle}</S.DashboardTitle>
                <NavLink 
                { ...routes.bookingRequests }
                linkComponent={S.NavButton}
                activeLinkComponent={S.ActiveButton}>
                    {text.bookingRequests}
                </NavLink>
                <NavLink 
                { ...routes.creatorCalendar }
                linkComponent={S.NavButton}
                activeLinkComponent={S.ActiveButton}>
                    {text.calendar}
                </NavLink>
                <NavLink 
                { ...routes.createdExperiences }
                linkComponent={S.NavButton}
                activeLinkComponent={S.ActiveButton}>
                    {text.createdExperiences}
                </NavLink>
                {props.children}
            </S.Container>
        </Div100vh>
    );
}

export default DashboardLayout;