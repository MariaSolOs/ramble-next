import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import type { CustomScrollProps } from 'react-custom-scroll';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import { getTimePieces } from 'lib/date-time';
import { getCardIcon } from 'lib/booking';
import type { SubmittedSlideProps } from './index';

import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Scroll from 'components/Scroll';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';
import * as S from './SubmittedSlide.styled';

const SubmittedSlide = (props: SubmittedSlideProps) => {
    const { BookExperience_SubmittedSlide: text } = useLanguageContext().appText;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const isOnlineExperience = !Boolean(props.experience.meetingPoint);
    const [startTime, startMeridiem] = getTimePieces(props.startDate);
    const [endTime, endMeridiem] = getTimePieces(props.endDate);
    const occurrenceDate = props.startDate.toFormat('EEEE, MMMM d');

    const bookingSummary = (
        <>
            <S.WhiteText component="h2">{props.experience.title}</S.WhiteText>
            <S.GreyText component="time" sx={{ textTransform: 'capitalize', display: 'block' }}>
                {occurrenceDate}
            </S.GreyText>
            <S.GreyText component="time">
                {`${startTime} ${startMeridiem} - ${endTime} ${endMeridiem}`}
            </S.GreyText>
            <S.GreyText component="p">
                <S.Icon icon={faUsers} />
                {props.numGuests} {props.numGuests > 1 ? text.guests : text.guest}
            </S.GreyText>
            <S.SectionTitle>{text.host}</S.SectionTitle>
            <S.HostInfo>
                <Avatar>
                    <Image
                    src={props.host.photo.src}
                    alt={props.host.name}
                    width={40}
                    height={40}
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={props.host.photo.placeholder} />
                </Avatar>
                <S.GreyText component="p">{props.host.name}</S.GreyText>
                <S.GreyText component="p">
                    <S.Icon icon={faPhoneAlt} />
                    {props.host.phoneNumber}
                </S.GreyText>
            </S.HostInfo>
            {props.experience.toBring.length > 0 &&
                <>
                    <S.SectionTitle>{text.toBringTitle}</S.SectionTitle>
                    <Box component="ul" m="0" pl="20px">
                        {props.experience.toBring.map(item => 
                            <S.GreyText key={uuid()} component="li">
                                {item}
                            </S.GreyText>
                        )}
                    </Box>
                </>}
            <S.SectionTitle>{text.meetingSpotTitle}</S.SectionTitle>
            <S.GreyText component="address">
                {isOnlineExperience ? 
                <><S.Icon icon={faLaptop} /> {text.online}</> : 
                <>
                    <S.Icon icon={faMapMarkerAlt} />
                    {props.experience.meetingPoint}
                </>}
            </S.GreyText>
            <S.SectionTitle>{text.paymentDetails}</S.SectionTitle>
            <S.AllCaps component="p">{text.paymentMethod}</S.AllCaps>
            <S.GreyText component="p">
                <S.Icon icon={getCardIcon(props.cardBrand)} />
                <Box component="span" m="0 5px">
                    &bull;&bull;&bull;&bull; 
                    &bull;&bull;&bull;&bull; 
                    &bull;&bull;&bull;&bull;
                </Box>
                {props.cardLast4}
            </S.GreyText>
            <S.PriceRow>
                <S.WhiteText>{text.total} ({props.currency})</S.WhiteText>
                <S.WhiteText>${props.totalPrice.toFixed(2)}</S.WhiteText>
            </S.PriceRow>
        </>
    );

    return (
        <S.Container>
            <Box sx={{ m: '0 auto', width: { xs: '95vw', sm: '80vw' } }}>
                <S.Header>
                    <S.HeaderGradient />
                    <div>
                        <S.WhiteText component="h1">{text.title}</S.WhiteText>
                        <S.GreyText component="h3">
                            {text.subtitle1} {props.host.name} {text.subtitle2}
                        </S.GreyText>
                    </div>
                </S.Header>
                <S.SummaryContainer>
                    <S.ExperienceImage>
                        <Image
                        alt={props.experience.title}
                        src={props.experience.image.src}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={props.experience.image.placeholder} />
                    </S.ExperienceImage>
                    <S.BookingContainer 
                    component={isMobile ? 'div' : Scroll}
                    { ...!isMobile && {
                        heightRelativeToParent: '100%'
                    } as CustomScrollProps}>
                        {bookingSummary}
                    </S.BookingContainer>
                    <S.Button variant="experience" link={routes.home}>
                        {text.buttonText}
                    </S.Button>
                </S.SummaryContainer>
            </Box>
        </S.Container>
    );
}

export default SubmittedSlide;