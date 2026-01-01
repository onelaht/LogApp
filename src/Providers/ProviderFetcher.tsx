import React, {createContext, useContext, useState} from "react";

interface IProviderFetcher {
    fetched: boolean;
    setFetched: React.Dispatch<React.SetStateAction<boolean>>;
}

const FetcherContext = createContext<IProviderFetcher | null>(null);

export default function ProviderFetcher({children}:{children: React.ReactNode}) {
    const [fetched, setFetched] = useState<boolean>(false);

    return (
        <FetcherContext value={{fetched, setFetched}}>
            {children}
        </FetcherContext>
    )
}

export const useFetcher = () => {
    const context = useContext(FetcherContext);
    if(!context) throw new Error("FetcherContext must be used within a provider.");
    return context;
}