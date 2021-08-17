import React, { useState, useEffect, createContext, useContext } from 'react';
import { useSession, getSession } from 'next-auth/client';

import type { Image } from 'models/files';

type User = {
    isLoggedIn: boolean;
    isCreator: boolean;
    userName?: string;
    userPhoto?: Image;
}

type UserContextType = {
    userUi: User;
    editUserUi: (user: User) => void;
} 

const UserContext = createContext<UserContextType>({
    userUi: {
        isLoggedIn: false,
        isCreator: false
    },
    editUserUi: () => {}
});

const useUserContext = () => useContext(UserContext);

/**
 * For faster changes when updating the user's profile, keep
 * necessary fields as context.
 */
export const UserContextProvider: React.FC = (props) => {
    const [session] = useSession();
    const [userUi, setUser] = useState<User>({
        isLoggedIn: false,
        isCreator: false
    });

    useEffect(() => {
        setUser({
            isLoggedIn: Boolean(session),
            isCreator: Boolean(session?.user.creatorId),
            userName: session?.user.firstName,
            userPhoto: session?.user.photo
        });
    }, [session]);

    const editUserUi = (newUser: User) => {
        setUser(newUser);
        getSession();
    }

    return (
        <UserContext.Provider value={{ userUi, editUserUi }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default useUserContext;