import type React from 'react';

import type { CompletableSlide } from 'models/application';

import Location from './Location';

export interface LocationProps extends CompletableSlide {
    storedLocations: string[];
    isOnlineExperience: boolean;
    location: string;
    meetingPoint: string;
    zoomPMI: string;
    zoomPassword: string;
    disableLocation: boolean;
    onLocationChange: (loc: string) => void;
    onMeetingPointChange: (meetPoint: string) => void;
    onZoomPMIChange: (pmi: string) => void;
    onZoomPasswordChange: (pwd: string) => void;
    setCoordinates: (lat: number, long: number) => void;
}

export type ZoomFieldProps = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    tooltipText: string;
    tooltipLink: string;
}

export default Location;