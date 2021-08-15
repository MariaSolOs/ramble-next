import React from 'react';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { LayoutProps } from './index';

import NavLink from 'components/NavLink';
import Dropzone from 'components/Dropzone';
import Avatar from '@material-ui/core/Avatar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Layout.styles';
const useStyles = makeStyles(styles);

const Layout: React.FC<LayoutProps> = (props) => {
    const { Profile_Layout: text } = useLanguageContext().appText;
    const classes = useStyles();
    
    const isPhotoEditable = Boolean(props.onPhotoChange);

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                {isPhotoEditable ?
                    <Dropzone
                    image={props.photo}
                    addButton={AddAPhotoIcon}
                    addButtonClassName={classes.addPhotoIcon}
                    deleteButtonClassName={classes.deletePhotoIcon}
                    dropzoneClassName={`${classes.photo} ${classes.photoDropzone}`}
                    previewImageClassName={`${classes.photo} ${classes.photoPreview}`}
                    onFileDrop={props.onPhotoChange!} /> :
                    <Avatar src={props.photo} className={classes.photo}>
                        {props.name.charAt(0)}
                    </Avatar>}
                <div>
                    <h3 className={classes.name}>{props.name}</h3>
                    <p className={classes.city}>{props.city}</p>
                </div>
            </header>
            <nav className={classes.nav}>
                <NavLink
                link={routes.userProfile}
                className={classes.navLink}
                activeClassName={classes.activeLink}>
                    {text.personalInformation}
                </NavLink>
                <NavLink
                link={routes.userExperiences}
                className={classes.navLink}
                activeClassName={classes.activeLink}>
                    {text.experiences}
                </NavLink>
            </nav>
            {props.children}
        </div>
    );
}

export default Layout;