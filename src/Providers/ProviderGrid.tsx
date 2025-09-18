import React, {createContext, ReactNode, useContext, useState} from 'react';

interface IGridContextType {
    colDef: string[][] | null;
    setColDef: React.Dispatch<React.SetStateAction<string[][] | null>>;
}

const GridContext = createContext<IGridContextType | null>(null);

export default function ProviderGrid({children}:{children: ReactNode}) {
    const [colDef, setColDef] = useState<string[][] | null>(null)
    return(
        <GridContext value={{colDef, setColDef}}>
            {children}
        </GridContext>
    )
}

export const useGrid = () => {
    const context = useContext(GridContext);
    if(!context) throw new Error("GridContext must be used within a provider.");
    return context;
}