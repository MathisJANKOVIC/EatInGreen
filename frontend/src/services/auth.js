import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token')); // Initialisez le token à partir du localStorage


    function login(newToken){
        setToken(newToken);
        localStorage.setItem('token', newToken); // Enregistrez le token dans le localStorage

    }

    function logout(){
        setToken(null);
        localStorage.removeItem('token'); // Supprimez le token du localStorage lors de la déconnexion

    }

    function isLoggedIn(){
        return !!token; // La fonction renvoie true si le token existe, sinon false
    };



    return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn}}>
        {children}
    </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
};