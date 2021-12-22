import type React from 'react';

import CalendarLayout from './CalendarLayout';

export type CalendarLayoutProps = {
    CalendarComponent: React.ReactNode;
    useMobileLayout: boolean;
}

export default CalendarLayout;