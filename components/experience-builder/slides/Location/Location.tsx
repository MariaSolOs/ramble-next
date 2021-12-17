import React, { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import type { LocationProps, ZoomFieldProps } from './index';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import TextField from 'components/TextField';
import HelpIcon from '@mui/icons-material/Help';
import * as S from './Location.styled';

const ZOOM_PMI_DOCS = 'https://support.zoom.us/hc/en-us/articles/203276937-Using-Personal-Meeting-ID-PMI-';
const ZOOM_PASSWORD_DOCS = 'https://support.zoom.us/hc/en-us/articles/115005166483-Managing-your-password';

const Location = (props: LocationProps) => {
    const { BuilderSlides_Location: text } = useLanguageContext().appText;

    const { 
        isOnlineExperience,
        onSlideComplete,
        location,
        meetingPoint,
        zoomPMI,
        zoomPassword
    } = props;
    useEffect(() => {
        if (isOnlineExperience) {
            onSlideComplete(
                location.trim().length > 0 &&
                zoomPMI.trim().length > 0 && 
                zoomPassword.trim().length > 0
            );
        } else {
            onSlideComplete(
                location.trim().length > 0 &&
                meetingPoint.trim().length > 0
            );
        }
    }, [isOnlineExperience, onSlideComplete, location, meetingPoint, zoomPMI, zoomPassword]);

    // For in person experiences, get coordinates for the map
    useEffect(() => {
        if (!isOnlineExperience && location && meetingPoint) {
            let mounted = true;

            const query = `${location}, ${meetingPoint}`;
    
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${query}&limit=1&apiKey=${process.env.NEXT_PUBLIC_HERE_API_KEY}`)
            .then(res => {
                if (mounted && res.status === 200) {
                    return res.json();
                }
            })
            .then(res => {
                if (res?.items?.length > 0) {
                    const coords = res.items[0].position;
                    props.setCoordinates(coords.lat, coords.lng);
                }
            });
    
            return () => { mounted = false; }
        }
        // We can assume the setCoordinates callback never changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnlineExperience, location, meetingPoint]);

    const ZoomField = (props: ZoomFieldProps) => (
        <S.ZoomTextField
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        endAdornment={
            <Tooltip
            enterTouchDelay={50}
            placement="top"
            title={
                <span>
                    {props.tooltipText}{' '}
                    <Box 
                    component="a"
                    sx={{ fontWeight: 'bold', color: '#FFF' }}
                    href={props.tooltipLink} 
                    target="_blank" 
                    rel="noopener noreferrer">
                        {text.zoomDocs}
                    </Box>.
                </span>
            }>
                <HelpIcon />
            </Tooltip>
        } />
    );

    // Depending on the experience type, fill Zoom info or meeting point info
    return (
        <>
            <S.Title>{text.locationTitle}</S.Title>
            <S.Subtitle>{text.cityQuestion}</S.Subtitle>
            <S.Autocomplete
            options={props.storedLocations}
            value={location}
            freeSolo
            disabled={props.disableLocation}
            PaperComponent={S.Paper}
            onInputChange={(_, value, __) => props.onLocationChange(value)} />
            <Box sx={{ mt: { xs: '35px', sm: 6.25 } }}>
                {isOnlineExperience ?
                    <>
                        <ZoomField
                        value={zoomPMI}
                        onChange={e => props.onZoomPMIChange(e.target.value)}
                        placeholder={text.zoomPMI}
                        tooltipText={text.zoomPMIHelp}
                        tooltipLink={ZOOM_PMI_DOCS} />
                        <ZoomField
                        value={zoomPassword}
                        onChange={e => props.onZoomPasswordChange(e.target.value)}
                        placeholder={text.zoomPassword}
                        tooltipText={text.zoomPasswordHelp}
                        tooltipLink={ZOOM_PASSWORD_DOCS} />
                    </> : 
                    <>
                        <S.Title>{text.meetingPoint}</S.Title>
                        <S.Subtitle>
                            {text.meetingPointQuestion}
                        </S.Subtitle>
                        <S.Tip>{text.accessTip}</S.Tip>
                        <TextField
                        fullWidth
                        required
                        value={meetingPoint}
                        onChange={e => props.onMeetingPointChange(e.target.value)} />
                        <Box 
                        component="p" 
                        sx={{ color: '#CDCDCD', fontSize: '0.9rem' }}>
                            {text.sharedInfoRemark}
                        </Box>
                    </>}
            </Box>
        </>
    );
}

export default Location;