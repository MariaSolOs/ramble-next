import { useReducer, useCallback } from 'react';
import { DateTime } from 'luxon';
import type { EventInput } from '@fullcalendar/react';

import type { 
    GetSlotableOccurrencesQuery as OccurrencesData,
    CreateOccurrenceMutation as OccurrenceData,
    BookingType
} from 'graphql-server/sdk';
import type { Image } from 'models/files';
import { TIMEZONE_CONFIG } from 'global-constants';

export type ExperienceOption = {
    _id: string;
    title: string;
    duration: number;
    capacity: number;
}

// Type of the occurrence object used in the calendar
export type Occurrence = EventInput & {
    dateStart: DateTime;
    dateEnd: DateTime;
    numGuests: number;
    bookings: { 
        _id: string; 
        clientName: string; 
        clientPhoto?: Image; 
        clientPhone?: string;
        numGuests: number;
        bookingType: BookingType;
    }[];
}

// Type of the GraphQL query occurrence
type ServerOccurrence = OccurrencesData['occurrences'][number];

interface CalendarState {
    addForm: {
        experience?: ExperienceOption;
        startDate: DateTime;
        endDate: DateTime;
        experienceOptions: ExperienceOption[];
    }
    detailedDay: DateTime;
    occurrences: Map<string, Occurrence[]>;
    isAddingSlot: boolean;
    isDrawerOpen: boolean;
    isDetailsDialogOpen: boolean;
}

const initialState: CalendarState = {
    addForm: {
        // Start adding from the start of the next hour
        startDate: DateTime.now().plus({ hours: 1 }).startOf('hour'),
        endDate: DateTime.now().plus({ hours: 2 }).startOf('hour'),
        experienceOptions: []
    },
    detailedDay: DateTime.now(),
    occurrences: new Map(),
    isAddingSlot: false,
    isDrawerOpen: false,
    isDetailsDialogOpen: false
}

type Action = 
| { type: 'TOGGLE_DRAWER'; open: boolean; }
| { type: 'CLOSE_DETAILS_DIALOG'; }
| { type: 'SET_EXPERIENCE_OPTIONS'; options: ExperienceOption[]; }
| { type: 'SET_OCCURRENCES'; occurrences: OccurrencesData; } 
| { type: 'ADD_OCCURRENCE'; occurrence: OccurrenceData; }
| { type: 'DELETE_OCCURRENCE'; keyDate: string; id: string; }
| { type: 'SET_ADD_DATE'; startDate: DateTime; }
| { type: 'SET_ADD_EXPERIENCE'; id: string; }
| { type: 'SET_DETAILED_DATE'; date: DateTime; isMobile: boolean; }
| { type: 'SET_IS_ADDING_SLOT'; value: boolean; }

// For the calendar bullets
export const BULLET_COLORS = new Map<string, string>();

/**
 * Initializes the experience-color map.
 */
const setBulletColors = (experiences: ExperienceOption[]) => {
    experiences.forEach((exp, idx) => {
        let color = '';
        switch (idx) {
            case 0:
                color = '#00A1FF';
                break;
            case 1:
                color = '#F93E35';
                break
            case 2:
                color = '#FFD743';
                break;
            default:
                // Generate a random color
                color = Math.floor(Math.random() * 16777215).toString(16);
        }
        BULLET_COLORS.set(exp._id, color);
    });
}

/**
 * Creates a new occurrence object for the calendar
 */
const createCalendarOccurrence = (occ: ServerOccurrence) => {
    const start = DateTime.fromISO(occ.dateStart, TIMEZONE_CONFIG);
    const end = DateTime.fromISO(occ.dateEnd, TIMEZONE_CONFIG);
    const created: Occurrence = {
        id: occ._id,
        groupId: occ.experience._id,
        start: start.toISO(),
        end: end.toISO(),
        dateStart: start,
        dateEnd: end,
        title: occ.experience.title,
        numGuests: occ.bookings.length > 0 ?
            occ.bookings.map(({ numGuests }) => 
                numGuests
            ).reduce((acc, val) => acc + val) : 0,
        bookings: occ.bookings.map(booking => ({
            _id: booking._id,
            clientName: booking.client.firstName,
            clientPhoto: booking.client.photo || undefined,
            clientPhone: booking.client.phoneNumber || undefined,
            numGuests: booking.numGuests,
            bookingType: booking.bookingType
        }))
    }
    return created;
}

export default function useCreatorCalendarReducer() {
    const reducer = useCallback((state: CalendarState, action: Action): CalendarState => {
        switch (action.type) {
            case 'TOGGLE_DRAWER':
                return {
                    ...state,
                    isDrawerOpen: action.open
                }
            case 'CLOSE_DETAILS_DIALOG':
                return {
                    ...state,
                    isDetailsDialogOpen: false
                }
            case 'SET_EXPERIENCE_OPTIONS':
                // Set the colors
                setBulletColors(action.options);
                // Set the experience in the form to the first one by default
                const defaultExp = action.options.length > 0 ?
                    action.options[0] : undefined;
                return {
                    ...state,
                    addForm: {
                        ...state.addForm,
                        experience: defaultExp,
                        experienceOptions: action.options
                    }
                }
            case 'SET_OCCURRENCES': {
                const occurrences = new Map<string, Occurrence[]>();
                for (const occ of action.occurrences.occurrences) {
                    const value = createCalendarOccurrence(occ);
                    const dateKey = value.dateStart.toISODate();

                    if (occurrences.has(dateKey)) {
                        occurrences.get(dateKey)!.push(value);
                    } else {
                        occurrences.set(dateKey, [value]);
                    }
                }
                    
                // Sort the occurrences chronologically 
                for (const [, occList] of occurrences) {
                    occList.sort((occ1, occ2) => 
                        +occ1.dateStart - +occ2.dateStart
                    );
                }

                return {
                    ...state,
                    occurrences
                }
            }
            case 'ADD_OCCURRENCE': {
                // Create occurrence object
                const occurrence = action.occurrence.createOccurrence;
                const occ = createCalendarOccurrence({ 
                    ...occurrence, 
                    bookings: []
                });
                
                // Modify current occurrences
                const dateKey = occ.dateStart.toISODate();
                const occurrences = state.occurrences;
                const sameDateOccurrences = occurrences.has(dateKey) ? 
                    occurrences.get(dateKey)! : [];
                sameDateOccurrences.push(occ);
                sameDateOccurrences.sort((occ1, occ2) => 
                    +occ1.dateStart - +occ2.dateStart
                );
                occurrences.set(dateKey, sameDateOccurrences);

                return {
                    ...state,
                    occurrences,
                    isAddingSlot: false
                }
            }
            case 'DELETE_OCCURRENCE':
                const keyDate = DateTime.fromISO(action.keyDate, TIMEZONE_CONFIG).toISODate();
                    
                // Modify current occurrences
                const occurrences = state.occurrences;
                let sameDateOccurrences = occurrences.has(keyDate) ? 
                    occurrences.get(keyDate)! : [];
                sameDateOccurrences = sameDateOccurrences.filter(({ id }) =>
                    id !== action.id
                );
                occurrences.set(keyDate, sameDateOccurrences);

                return {
                    ...state,
                    occurrences
                }
            case 'SET_ADD_DATE':
                const duration = state.addForm.experience?.duration || 1;
                return {
                    ...state,
                    addForm: {
                        ...state.addForm,
                        startDate: action.startDate,
                        endDate: action.startDate.plus({ 
                            hours: duration 
                        })
                    }
                }
            case 'SET_ADD_EXPERIENCE':
                const experience = state.addForm.experienceOptions.find(({ _id }) =>
                    _id === action.id
                )!;
                const startDate = DateTime.now().plus({ hours: 1 }).startOf('hour');
                const endDate = startDate.plus({ hours: experience.duration });
                return {
                    ...state,
                    addForm: {
                        ...state.addForm,
                        experience,
                        startDate,
                        endDate
                    }
                }
            case 'SET_DETAILED_DATE':
                return {
                    ...state,
                    detailedDay: action.date,
                    isDetailsDialogOpen: action.isMobile
                }
            case 'SET_IS_ADDING_SLOT':
                return {
                    ...state,
                    isAddingSlot: action.value
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}