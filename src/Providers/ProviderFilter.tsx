import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';

interface IGridContextType {
    uniqueSymbol: string[] | null;
    uniqueAccount: string[] | null;
    uniqueTradeType: string[] | null;
    setUniqueSymbol: React.Dispatch<React.SetStateAction<string[] | null>>;
    setUniqueAccount: React.Dispatch<React.SetStateAction<string[] | null>>;
    retrieveColSet: (type: string | null | undefined) => string[] | null;
}

const GridContext = createContext<IGridContextType | null>(null);

export default function ProviderFilter({children}:{children: ReactNode}) {
    // unique column sets
    const [uniqueAccount, setUniqueAccount] = useState<string[] | null>(null);
    const [uniqueSymbol, setUniqueSymbol] = useState<string[] | null>(null);
    const [uniqueTradeType] = useState<string[]>(["Long", "Short"]);
    // return set based on specified column type
    const retrieveColSet = useCallback((type: string | null | undefined): string[] | null => {
        switch(type) {
            case "Account": return uniqueAccount;
            case "Symbol": return uniqueSymbol;
            case "Trade Type": return uniqueTradeType;
            default: return null;
        }
    }, [uniqueAccount, uniqueSymbol, uniqueTradeType])
    return(
        <GridContext value={{uniqueAccount, uniqueSymbol, uniqueTradeType, setUniqueAccount, setUniqueSymbol,
            retrieveColSet}}>
            {children}
        </GridContext>
    )
}

export const useFilter = () => {
    const context = useContext(GridContext);
    if(!context) throw new Error("GridContext must be used within a provider.");
    return context;
}