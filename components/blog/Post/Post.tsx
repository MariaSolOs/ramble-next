import React from 'react';
import { DateTime } from 'luxon';

import useLanguageContext from 'context/languageContext';
import type { PostProps } from './index';

import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
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
            <div>
                <h1 className={classes.title}>{meta.title}</h1>
                <time className={classes.subtitle}>{date}</time>
                <p className={classes.subtitle}>{meta.author.name}</p>
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
                width={135}
                height={40} />
            </footer>
        </div>
    );
}

export default Post;