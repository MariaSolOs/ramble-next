import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import type { LocationProps } from './index';

import Title from 'components/experience-builder/SlideTitle';
import Subtitle from 'components/experience-builder/SlideSubtitle';
import TextField from 'components/TextField';
import Autocomplete from 'components/Autocomplete';
import Tip from 'components/Tip';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Location.styles';
const useStyles = makeStyles(styles);

const ZOOM_PMI_DOCS = 'https://support.zoom.us/hc/en-us/articles/203276937-Using-Personal-Meeting-ID-PMI-';
const ZOOM_PASSWORD_DOCS = 'https://support.zoom.us/hc/en-us/articles/203276937-Using-Personal-Meeting-ID-PMI-';

const Location = (props: LocationProps) => {
    const { BuilderSlides_Location: text } = useLanguageContext().appText;
    const classes = useStyles();

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
    
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${query}&limit=1&apiKey=${process.env.REACT_APP_HERE_API_KEY}`)
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

    // Depending on the experience type, fill Zoom info or meeting point info
    return (
        <>
            <Title>{text.locationTitle}</Title>
            <Subtitle className={classes.subtitle}>{text.cityQuestion}</Subtitle>
            <Autocomplete 
            className={classes.autocomplete}
            paperclass={classes.autocompletePaper}
            options={props.storedLocations}
            value={location}
            freeSolo
            onInputChange={(_, value, __) => props.onLocationChange(value)} />
            {isOnlineExperience ? 
                <div className={classes.locationInfoContainer}>
                    <InputBase 
                    value={zoomPMI}
                    onChange={e => props.onZoomPMIChange(e.target.value)}
                    placeholder={text.zoomPMI}
                    className={classes.zoomTextfield}
                    endAdornment={
                        <Tooltip
                        enterTouchDelay={50}
                        title={
                            <span>
                                {text.zoomPMIHelp}{' '}
                                <a 
                                className={classes.tooltipLink} 
                                href={ZOOM_PMI_DOCS} 
                                target="_blank" 
                                rel="noopener noreferrer">
                                    {text.zoomDocs}
                                </a>.
                            </span>
                        }
                        interactive
                        placement="top">
                            <HelpIcon />
                        </Tooltip>
                    } />
                    <InputBase 
                    value={zoomPassword}
                    onChange={e => props.onZoomPasswordChange(e.target.value)}
                    placeholder={text.zoomPassword}
                    className={classes.zoomTextfield}
                    endAdornment={
                        <Tooltip
                        enterTouchDelay={50}
                        title={
                            <span>
                                {text.zoomPasswordHelp}{' '}
                                <a 
                                className={classes.tooltipLink} 
                                href={ZOOM_PASSWORD_DOCS} 
                                target="_blank" 
                                rel="noopener noreferrer">
                                    {text.zoomDocs}
                                </a>.
                            </span>
                        }
                        interactive
                        placement="top">
                            <HelpIcon />
                        </Tooltip>
                    } />
                </div> :
                <div className={classes.locationInfoContainer}>
                    <Title>{text.meetingPoint}</Title>
                    <Subtitle className={classes.subtitle}>
                        {text.meetingPointQuestion}
                    </Subtitle>
                    <Tip className={classes.tip}>{text.accessTip}</Tip>
                    <TextField
                    fullWidth
                    required
                    value={meetingPoint}
                    onChange={e => props.onMeetingPointChange(e.target.value)} />
                    <p className={classes.sharedInfoRemark}>{text.sharedInfoRemark}</p>
                </div>}
        </>
    );
}

export default Location;