import useLanguageContext from 'context/languageContext';
import type { GraphItemProps } from './index';

import Image from 'next/image';
import Box from '@mui/material/Box';
import lightbulbIcon from 'public/images/actout-lightbulb.svg';
import cloudIcon from 'public/images/actout-cloud.svg';
import walletIcon from 'public/images/actout-wallet.svg';
import * as S from './ActGraph.styled';

const GraphItem = (props: GraphItemProps) => (
    <S.GraphItem>
        <S.GraphCircle>
            <Image src={props.icon} width={35} height={35} alt={props.iconAlt} />
        </S.GraphCircle>
        <S.GraphText>{props.description}</S.GraphText>
    </S.GraphItem>
);

const ActGraph = () => {
    const { BecomeACreator: text } = useLanguageContext().appText;

    return (
        <Box sx={{ m: '100px auto 0', width: { xs: '90vw', sm: '65vw' } }}>
            <S.Title>
                {text.actTitle1}
                <S.Underlined>
                    {text.actTitle2}
                    <S.GradientLine as="span" />
                </S.Underlined>
            </S.Title>
            <Box sx={{ position: 'relative' }}>
                <S.Graph>
                    <GraphItem
                    icon={lightbulbIcon}
                    iconAlt="Share your passion"
                    description={text.lightbulbText} />
                    <GraphItem
                    icon={cloudIcon}
                    iconAlt="Bring people into your world"
                    description={text.cloudText} />
                    <GraphItem
                    icon={walletIcon}
                    iconAlt="Make money"
                    description={text.walletText} />
                    <S.GradientLine as="div" />
                </S.Graph>
            </Box>
        </Box>
    );
}

export default ActGraph;