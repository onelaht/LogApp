import React, {createContext, ReactNode, useContext, useState} from 'react';

interface IGridContextType {
    uniqueSymbol: string[] | null;
    uniqueAccount : string[] | null;
    uniqueTradeType: string[] | null;
    setUniqueSymbol: React.Dispatch<React.SetStateAction<string[] | null>>;
    setUniqueAccount: React.Dispatch<React.SetStateAction<string[] | null>>;}

const GridContext = createContext<IGridContextType | null>(null);

export default function ProviderFilter({children}:{children: ReactNode}) {
    const [uniqueAccount, setUniqueAccount] = useState<string[] | null>(null);
    const [uniqueSymbol, setUniqueSymbol] = useState<string[] | null>(null);
    const [uniqueTradeType] = useState<string[]>(["Long", "Short"]);
    return(
        <GridContext value={{uniqueAccount, uniqueSymbol, uniqueTradeType, setUniqueAccount, setUniqueSymbol,}}>
            {children}
        </GridContext>
    )
}

export const useFilter = () => {
    const context = useContext(GridContext);
    if(!context) throw new Error("GridContext must be used within a provider.");
    return context;
}