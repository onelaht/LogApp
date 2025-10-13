// react
import {ReactNode} from "react";
// providers wrapped
import ProviderFilter from "./ProviderFilter";
import ProviderGrid from "./ProviderGrid";

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