import React, {createContext, ReactNode, useContext, useState} from 'react';

interface ITagContextType {
    tagMap: Map<string, string[]>;
    setTagMap: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
}

const TagContext = createContext<ITagContextType | null>(null);

export default function ProviderTag({children}:{children: ReactNode}) {
    //
    const [tagMap, setTagMap] = useState<Map<string, string[]>>(new Map<string, string[]>());
    return (
        <TagContext value={{tagMap, setTagMap}}>
            {children}
        </TagContext>
    )
}

export const useTag = () => {
    const context = useContext(TagContext);
    if(!context) throw new Error("TagContext must be used within a provider.");
    return context;
}//