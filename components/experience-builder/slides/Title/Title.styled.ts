import { styled } from '@mui/material/styles';

import BaseTip from 'components/Tip';
import { Subtitle as BaseSubtitle } from 'components/experience-builder/slides/Shared.styled';

export { Title } from 'components/experience-builder/slides/Shared.styled';

export const Subtitle = styled(BaseSubtitle)({ margin: '10px 0' });

export const Tip = styled(BaseTip)({ margin: '30px 0' });
