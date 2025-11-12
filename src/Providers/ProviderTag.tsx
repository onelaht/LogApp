import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Row} from "../Types/Row";
import {ColDef} from "ag-grid-community";

interface ITagContextType {
    tagDefs: ColDef<Row>[];
    setTagDefs: React.Dispatch<React.SetStateAction<ColDef<Row>[]>>;
}

const TagContext = createContext<ITagContextType | null>(null);

export default function ProviderTag({children}:{children: ReactNode}) {
    //
    const [tagDefs, setTagDefs] = useState<ColDef<Row>[]>([]);
    return (
        <TagContext value={{tagDefs, setTagDefs}}>
            {children}
        </TagContext>
    )
}

export const useTag = () => {
    const context = useContext(TagContext);
    if(!context) throw new Error("TagContext must be used within a provider.");
    return context;
}//