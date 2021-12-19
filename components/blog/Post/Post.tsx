import React from 'react';
import { DateTime } from 'luxon';

import useLanguageContext from 'context/languageContext';
import type { PostProps } from './index';

import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons/faShareSquare';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import rambleLogo from 'public/images/ramble-brand.png';
import * as S from './Post.styled';

const Post = (props: PostProps) => {
    const { language } = useLanguageContext();
    
    const { meta, content } = props.post;
    const date = DateTime.fromISO(meta.date).setLocale(language).toLocaleString(DateTime.DATE_FULL);

    return (
        <S.Container>
            <Box component="h1" m="0 0 -8px">{meta.title}</Box>
            <S.Subtitle component="time">{date}</S.Subtitle>
            <S.Subtitle component="p">{meta.author.name}</S.Subtitle>
            <S.Media>
                <div>
                    {meta.author.instagram && 
                        <a href={meta.author.instagram} rel="noopener noreferrer" target="_blank">
                            <S.MediaIcon icon={faInstagram} />
                        </a>}
                    {meta.author.facebook && 
                        <a href={meta.author.facebook} rel="noopener noreferrer" target="_blank">
                            <S.MediaIcon icon={faFacebook} />
                        </a>}
                </div>
                <S.ShareFab disableRipple onClick={props.onShareClick}>
                    <S.ShareIcon icon={faShareSquare} />
                </S.ShareFab>
            </S.Media>
            <Box sx={{ backgroundColor: '#C0BFBA', p: '1px 0', width: '40%' }} />
            <Markdown
            options={{
                wrapper: React.Fragment,
                overrides: {
                    p: { component: S.Paragraph }
                }
            }}>
                {content}
            </Markdown>
            <S.Footer>
                <Image
                src={rambleLogo}
                alt="Ramble"
                width={138}
                height={40} />
            </S.Footer>
        </S.Container>
    );
}

export default Post;