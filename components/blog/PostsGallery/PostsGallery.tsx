import { v4 as uuid } from 'uuid';

import routes from 'routes';
import type { PostsGalleryProps } from './index';

import Image from 'next/image';
import NavLink from 'components/NavLink';

import { makeStyles } from '@material-ui/core/styles';
import styles from './PostsGallery.styles';
const useStyles = makeStyles(styles);

const PostsGallery = (props: PostsGalleryProps) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {props.posts.map(({ title, image, slug }) => 
                <NavLink key={uuid()} link={routes.blogPost(slug)} className={classes.card}>
                    <div className={classes.cardImg}>
                        <Image
                        src={image.src}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={image.placeholder} />
                    </div>
                    <p className={classes.cardTitle}>{title}</p>
                </NavLink>
            )}
        </div>
    );
}

export default PostsGallery;