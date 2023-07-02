import React, { createContext } from 'react';

export const AuthContext = createContext({});

const storageKey = 'sapo';

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}
/**
 * This is a provider for AuthContext.
 * It will handle the login and logout process.
 * You can use it like this: <AuthContextProvider>...</AuthContextProvider> and then you can use the AuthContext in your component.
 * For example: const { state, login, logout } = useContext(AuthContext);
 * state is an object that contains userId, token, username, isLogin.
 * login is a function that will set the userId, token, username, isLogin to true and save it to localStorage.
 * logout is a function that will set the userId, token, username, isLogin to false and remove it from localStorage.
 */
export const AuthContextProvider = ({ children }) => {
    const [userId, setUserId] = React.useState(null);
    const [isLogin, setIsLogin] = React.useState(false);
    const [token, setToken] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [code, setCode] = React.useState(null);
    const [staffname, setStaffname] = React.useState(null);
    const [remove, setRemove] = React.useState(0);

    const login = React.useCallback((userId, token, username, code, staffname) => {
        setUserId(userId);
        setToken(token);
        setUsername(username);
        setStaffname(staffname);
        setCode(code);
        setIsLogin(true);
        setCookie('Authorization', `Bearer ${token}`, 1);
        localStorage.setItem(storageKey, JSON.stringify({ userId, token, username, code, staffname }));
    }, []);

    const logout = React.useCallback(() => {
        setUserId(null);
        setToken(null);
        setUsername(null);
        setStaffname(null);
        setCode(null);
        setIsLogin(false);
        localStorage.removeItem(storageKey);
        document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    }, []);

    return (
        <AuthContext.Provider
            value={{
                state: {
                    userId,
                    token,
                    username,
                    code,
                    staffname,
                    isLogin,
                    remove,
                },
                login,
                logout,
                setRemove,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
