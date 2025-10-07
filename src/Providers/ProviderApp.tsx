import ProviderGrid from "./ProviderGrid";
import {ReactNode} from "react";
import ProviderFilter from "./ProviderFilter";

interface IProviderAppType{
    children: ReactNode;
}

export default function ProviderApp({children}:IProviderAppType) {
    return (
        <ProviderGrid>
            <ProviderFilter>
                {children}
            </ProviderFilter>
        </ProviderGrid>
    )
}