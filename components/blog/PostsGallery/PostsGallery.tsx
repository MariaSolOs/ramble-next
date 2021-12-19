import { v4 as uuid } from 'uuid';

import routes from 'routes';
import type { PostsGalleryProps } from './index';

import Link from 'next/link';
import Image from 'next/image';
import * as S from './PostsGallery.styled';

const PostsGallery = (props: PostsGalleryProps) => (
    <S.Container>
        {props.posts.map(({ title, image }) => 
            <Link key={uuid()} passHref { ...routes.blogPost(title) }>
                <S.Card>
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
                </S.Card>
            </Link>
        )}
    </S.Container>
);

export default PostsGallery;