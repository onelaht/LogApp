// react
import {ReactNode} from "react";
// providers wrapped
import ProviderFilter from "./ProviderFilter";
import ProviderGrid from "./ProviderGrid";
import ProviderTag from "./ProviderTag";

interface IProviderAppType{
    children: ReactNode;
}

export default function ProviderApp({children}:IProviderAppType) {
    return (
        <ProviderGrid>
            <ProviderFilter>
                <ProviderTag>
                    {children}
                </ProviderTag>
            </ProviderFilter>
        </ProviderGrid>
    )
}