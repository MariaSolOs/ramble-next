import type { Image } from './files';
import type { Language } from './translation';

export type CreatorBio = {
    name: string;
    image: Image;
    bio: Record<Language, string>;
}