import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: any) => {
    const [language, setLanguage] = useState<"fr" | "en">("fr");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
