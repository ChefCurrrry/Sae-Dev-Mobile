// context/TagSelectionContext.tsx
import React, { createContext, useContext, useState } from "react";

type TagSelection = {
    tag1: number | null;
    tag2: number | null;
    tag3: number | null;
    setTag1: (tag: number | null) => void;
    setTag2: (tag: number | null) => void;
    setTag3: (tag: number | null) => void;
};

const TagSelectionContext = createContext<TagSelection | null>(null);

export const TagSelectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [tag1, setTag1] = useState<number | null>(null);
    const [tag2, setTag2] = useState<number | null>(null);
    const [tag3, setTag3] = useState<number | null>(null);

    return (
        <TagSelectionContext.Provider value={{ tag1, tag2, tag3, setTag1, setTag2, setTag3 }}>
            {children}
        </TagSelectionContext.Provider>
    );
};

export const useTagSelection = () => {
    const context = useContext(TagSelectionContext);
    if (!context) throw new Error("useTagSelection must be used inside TagSelectionProvider");

    return context;


};
export const resetTags = () => {
    const context = useContext(TagSelectionContext);
    if (!context) throw new Error("useTagSelection must be used inside TagSelectionProvider");


    context.setTag1(null);
    context.setTag2(null);
    context.setTag3(null);

    return {context, resetTags};
};


