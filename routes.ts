import { createRoute } from 'next-typed-routes';

const routes = {
    home: createRoute('/'),
    experienceSearch: (location: string, capacity: string) => createRoute('/experience/search', undefined, { location, capacity }),
    experienceDetails: (expid: string) => createRoute('/experience/[expid]', { expid }),
    bookExperience: (expid: string) => createRoute('/experience/booking', undefined, { expid }),
    newExperience: createRoute('/experience/new'),
    editExperience: (expid: string) => createRoute('/experience/edit', undefined, { expid }),
    userProfile: createRoute('/profile/personal-information'),
    userExperiences: createRoute('/profile/experiences'),
    becomeACreator: createRoute('/creator/become'),
    creatorForm: createRoute('/creator/join'),
    bookingRequests: createRoute('/creator/dashboard/booking-requests'),
    creatorCalendar: createRoute('/creator/dashboard/calendar'),
    createdExperiences: createRoute('/creator/dashboard/experiences'),
    blog: createRoute('/blog')
}

export default routes;