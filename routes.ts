import { createRoute } from 'next-typed-routes';

const routes = {
    home: createRoute('/'),
    experienceDetails: (expid: string) => createRoute('/experience/[expid]', { expid }),
    newExperience: createRoute('/experience/new'),
    userProfile: createRoute('/profile/personal-information'),
    becomeACreator: createRoute('/creator/become'),
    bookingRequests: createRoute('/creator/dashboard/booking-requests')
}

export default routes;