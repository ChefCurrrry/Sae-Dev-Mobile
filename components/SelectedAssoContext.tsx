// context/SelectedAssoContext.tsx
import React, { createContext, useContext, useState } from "react";

const SelectedAssoContext = createContext<{
    id: number | null;
    setId: (id: number) => void;
}>({ id: null, setId: () => {} });

export const SelectedAssoProvider = ({ children }: { children: React.ReactNode }) => {
    const [id, setId] = useState<number | null>(null);
    return (
        <SelectedAssoContext.Provider value={{ id, setId }}>
            {children}
        </SelectedAssoContext.Provider>
    );
};

export const useSelectedAsso = () => useContext(SelectedAssoContext);
