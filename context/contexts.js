import React, { createContext, useState } from 'react';

export const AuthentificationContext = createContext();

export const AuthentificationProvider = ({ children }) => {
    const [isAuthentificat, setIsAuthentificat] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [solde, setSolde] = useState("");
    const [iban, setIban] = useState("");


    
    return (
        <AuthentificationContext.Provider value={{isRegister, setIsRegister,isAuthentificat, setIsAuthentificat, nom, setNom, prenom, setPrenom, email, password, solde, setSolde, iban, setIban }}>
            {children}
        </AuthentificationContext.Provider>
    );
};
