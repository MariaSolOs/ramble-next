import Location from './Location';
import type { CompletableSlide } from 'models/application';

export interface LocationProps extends CompletableSlide {
    storedLocations: string[];
    isOnlineExperience: boolean;
    location: string;
    meetingPoint: string;
    zoomPMI: string;
    zoomPassword: string;
    onLocationChange: (loc: string) => void;
    onMeetingPointChange: (meetPoint: string) => void;
    onZoomPMIChange: (pmi: string) => void;
    onZoomPasswordChange: (pwd: string) => void;
    setCoordinates: (lat: number, long: number) => void;
}

export default Location;