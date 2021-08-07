import { createRoute } from 'next-typed-routes';

const routes = {
    home: createRoute('/'),
    experienceSearch: (location: string, capacity: string) => createRoute('/experience/search', undefined, { location, capacity }),
    experienceDetails: (expid: string) => createRoute('/experience/[expid]', { expid }),
    newExperience: createRoute('/experience/new'),
    userProfile: createRoute('/profile/personal-information'),
    becomeACreator: createRoute('/creator/become'),
    creatorForm: createRoute('/creator/join'),
    bookingRequests: createRoute('/creator/dashboard/booking-requests')
}

export default routes;