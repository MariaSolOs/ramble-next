import React, { useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import useCalendarReducer, { BULLET_COLORS } from 'hooks/useCreatorCalendarReducer';
import type { Page } from 'models/application';

import Calendar from 'components/creator-dashboard/Calendar';
import CalendarDayDetails from 'components/creator-dashboard/CalendarDayDetails';
import AddSlotForm from 'components/creator-dashboard/AddSlotForm';
import CalendarLayout from 'components/creator-dashboard/CalendarLayout';
import DashboardLayout from 'components/creator-dashboard/DashboardLayout';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const CalendarPage: Page = () => {
    const { CreatorCalendar: text } = useLanguageContext().appText;
    const [session, loading] = useSession();
    const { uiDispatch } = useUiContext();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [state, dispatch] = useCalendarReducer();
    const calendarEvents = Array.from(state.occurrences.values()).flat();

    const collapseDrawer = useCallback(() => {
        dispatch({ type: 'TOGGLE_DRAWER', open: false });
    }, [dispatch]);

    const handleAddSlot = async (event: React.FormEvent) => {
        event.preventDefault();
        collapseDrawer();
        dispatch({ type: 'SET_IS_ADDING_SLOT', value: true });

        // Check if the new slot overlaps with existing ones
        for (const event of calendarEvents) {
            if ((event.dateStart <= state.addForm.endDate) && 
                (state.addForm.startDate <= event.dateEnd)) {
                // Show alert
                if (window.confirm(text.busySlotMessage)) {
                    // We can break here so that we don't show several alerts
                    break;
                } else {
                    dispatch({ type: 'SET_IS_ADDING_SLOT', value: false });
                    return;
                }
            }
        }

        // Create slot
        const newOccurrence = await sdk.createOccurrence({
            experienceId: state.addForm.experience!._id,
            experienceCapacity: state.addForm.experience!.capacity,
            dates: {
                start: state.addForm.startDate.toISO(),
                end: state.addForm.endDate.toISO()
            }
        });

        dispatch({ type: 'ADD_OCCURRENCE', occurrence: newOccurrence });
    }

    const handleDeleteSlot = async (slotId: string) => {
        const { deleteOccurrence } = await sdk.deleteOccurrence({ occurrenceId: slotId });
        // Once deleted from the database, update calendar
        dispatch({ 
            type: 'DELETE_OCCURRENCE',
            keyDate: deleteOccurrence.dateStart,
            id: deleteOccurrence._id
        });
    }

    // Query created experiences
    const { 
        data: experiencesData 
    } = sdk.useGetSlotableExperiences(session?.user.creatorId ? 'getSlotableExperiences' : null, {
        creatorId: session?.user.creatorId || ''
    });

    // From the fetched experiences, grab occurrences
    sdk.useGetSlotableOccurrences(experiencesData ? ['getSlotableExperiences', experiencesData] : null, 
        { experienceIds: experiencesData?.experiences.map(({ _id }) => _id) || [] },
        {
            onSuccess: (occurrences) => {
                dispatch({ type: 'SET_OCCURRENCES', occurrences });
            }
        }
    );

    // Make sure user is logged in and a creator
    useEffect(() => {
        if (!loading && (!session || !session.user.creatorId)) {
            router.replace('/');
            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
        }
    }, [session, loading, router, uiDispatch]);

    // Close the navigation drawer when resizing the window
    useEffect(() => {
        if (!isMobile) {
            collapseDrawer();
        }
    }, [isMobile, collapseDrawer]);

    // Set experience options when loaded
    useEffect(() => {
        if (experiencesData?.experiences) {
            dispatch({
                type: 'SET_EXPERIENCE_OPTIONS',
                options: experiencesData.experiences
            });
        }
    }, [experiencesData, dispatch]);

    return (
        <CalendarLayout
        useMobileLayout={isMobile}
        CalendarComponent={
            <Calendar
            events={Array.from(state.occurrences.values()).flat()}
            bulletMap={BULLET_COLORS}
            onDateSelect={date => {
                dispatch({ type: 'SET_DETAILED_DATE', date, isMobile });
            }} />
        }>
            <CalendarDayDetails
            day={state.detailedDay}
            daySlots={state.occurrences.get(state.detailedDay.toISODate()) || []}
            bulletMap={BULLET_COLORS}
            isDialogOpen={state.isDetailsDialogOpen}
            onDeleteSlot={handleDeleteSlot}
            onCloseDialog={() => dispatch({ type: 'CLOSE_DETAILS_DIALOG' })} />
            <AddSlotForm
            startDate={state.addForm.startDate}
            endDate={state.addForm.endDate}
            addExperience={state.addForm.experience}
            experienceOptions={state.addForm.experienceOptions}
            openDrawer={isMobile ? state.isDrawerOpen : undefined}
            addDisabled={
                state.addForm.experienceOptions.length === 0 ||
                state.isAddingSlot
            }
            onAddExperienceChange={id => {
                dispatch({ type: 'SET_ADD_EXPERIENCE', id });
            }}
            onDateChange={startDate => {
                dispatch({ type: 'SET_ADD_DATE', startDate });
            }}
            onOpenDrawer={() => {
                dispatch({ type: 'TOGGLE_DRAWER', open: true });
            }}
            onCloseDrawer={collapseDrawer}
            onSubmit={handleAddSlot} />
        </CalendarLayout>
    );
}

CalendarPage.displayName = 'CalendarPage';
CalendarPage.layout = DashboardLayout;

export default CalendarPage;