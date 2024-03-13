import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
    login: string | null;
    password: string | null;
    setAuthData: (login: string, password: string) => void;
}

interface GetLoginPassProps {
    children: ReactNode;
}

const GetLogPasContext = createContext<AuthContextProps | undefined>(undefined);

const GetLoginPass: React.FC<GetLoginPassProps> = ({ children }) => {
    const [login, setLogin] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const setAuthData = (newLogin: string, newPassword: string) => {
        setLogin(newLogin);
        setPassword(newPassword);
    };
    return (
        <GetLogPasContext.Provider value={{ login, password, setAuthData }}>
            {children}
        </GetLogPasContext.Provider>
    );
};

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(GetLogPasContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

export default GetLoginPass;