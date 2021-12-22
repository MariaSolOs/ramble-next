import { v4 as uuid } from 'uuid';

import routes from 'routes';
import type { PostsGalleryProps } from './index';

import Image from 'next/image';
import NavLink from 'components/NavLink';
import * as S from './PostsGallery.styled';

const PostsGallery = (props: PostsGalleryProps) => (
    <S.Container>
        {props.posts.map(({ title, image }) => 
            <NavLink 
            key={uuid()} 
            { ...routes.blogPost(title) }
            linkComponent={S.Card}>
                <S.CardImage>
                    <Image
                    src={image.src}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={image.placeholder} />
                </S.CardImage>
                <S.CardTitle>{title}</S.CardTitle>
            </NavLink>
        )}
    </S.Container>
);

export default PostsGallery;