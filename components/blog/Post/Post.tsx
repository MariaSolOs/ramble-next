import React from 'react';
import { DateTime } from 'luxon';

import useLanguageContext from 'context/languageContext';
import { FACEBOOK_LINK, INSTAGRAM_LINK } from 'global-constants';
import type { PostProps } from './index';

import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons/faShareSquare';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import rambleLogo from 'public/images/ramble-brand.png';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Post.styles';
const useStyles = makeStyles(styles);

const Post = (props: PostProps) => {
    const { language } = useLanguageContext();
    const classes = useStyles();
    
    const { meta, content } = props.post;
    const date = DateTime.fromISO(meta.date).setLocale(language).toLocaleString(DateTime.DATE_FULL);

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.title}>{meta.title}</h1>
            <time className={classes.subtitle}>{date}</time>
            <p className={classes.subtitle}>{meta.author.name}</p>
            <div className={classes.media}>
                <div>
                    {meta.author.instagram && 
                        <a href={INSTAGRAM_LINK} rel="noopener noreferrer" target="_blank">
                            <FontAwesomeIcon icon={faInstagram} className={classes.mediaIcon} />
                        </a>}
                    {meta.author.facebook && 
                        <a href={FACEBOOK_LINK} rel="noopener noreferrer" target="_blank">
                            <FontAwesomeIcon icon={faFacebook} className={classes.mediaIcon} />
                        </a>}
                </div>
                <Fab disableRipple className={classes.shareFab} onClick={props.onShareClick}>
                    <FontAwesomeIcon icon={faShareSquare} className={classes.shareIcon} />
                </Fab>
            </div>
            <div className={classes.divisor} />
            <Markdown
            options={{
                wrapper: React.Fragment,
                overrides: {
                    p: {
                        props: {
                            className: classes.paragraph
                        }
                    }
                }
            }}>
                {content}
            </Markdown>
            <footer className={classes.footer}>
                <Image
                src={rambleLogo}
                alt="Ramble"
                width={138}
                height={40} />
            </footer>
        </div>
    );
}

export default Post;