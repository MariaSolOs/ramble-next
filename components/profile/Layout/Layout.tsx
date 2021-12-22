import React from 'react';
import type { AvatarProps } from '@mui/material/Avatar';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { DropzoneProps } from 'components/Dropzone';
import type { LayoutProps } from './index';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Dropzone from 'components/Dropzone';
import NavLink from 'components/NavLink';
import * as S from './Layout.styled';

const Layout: React.FC<LayoutProps> = (props) => {
    const { Profile_Layout: text } = useLanguageContext().appText;
    
    const isPhotoEditable = Boolean(props.onPhotoChange);

    return (
        <S.Container>
            <Box component="header" sx={{ display: 'flex', alignItems: 'center' }}>
                {isPhotoEditable ?
                    <S.PhotoDropzone
                    component={Dropzone}
                    {...{
                        image: props.photo,
                        onFileDrop: props.onPhotoChange!,
                        addButton: S.AddPhotoIcon,
                        deleteButton: S.DeletePhotoIcon
                    } as DropzoneProps} /> : 
                    <S.Photo 
                    component={Avatar} 
                    {...{ src: props.photo } as AvatarProps}>
                        {props.name.charAt(0)}
                    </S.Photo>}
                <div>
                    <S.Name>{props.name}</S.Name>
                    <S.City>{props.city}</S.City>
                </div>
            </Box>
            <S.Nav>
                <NavLink 
                linkComponent={S.NavLink} 
                activeLinkComponent={S.ActiveLink}
                { ...routes.userProfile }>
                    {text.personalInformation}
                </NavLink>
                <NavLink 
                linkComponent={S.NavLink} 
                activeLinkComponent={S.ActiveLink}
                { ...routes.userExperiences }>
                    {text.experiences}
                </NavLink>
            </S.Nav>
            {props.children}
        </S.Container>
    );
}

export default Layout;