import type React from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

import Tip from './Tip';

export type TipProps = {
    icon?: IconDefinition;
    className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

export default Tip;