import ProviderGrid from "./ProviderGrid";
import {ReactNode} from "react";

interface IProviderAppType{
    children: ReactNode;
}

export default function ProviderApp({children}:IProviderAppType) {
    return (
        <ProviderGrid>
            {children}
        </ProviderGrid>
    )
}