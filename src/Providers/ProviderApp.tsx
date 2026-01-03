// react
import {ReactNode} from "react";
// providers wrapped
import ProviderFilter from "./ProviderFilter";
import ProviderGrid from "./ProviderGrid";
import ProviderTag from "./ProviderTag";
import ProviderFetcher from "./ProviderFetcher";

interface IProviderAppType{
    children: ReactNode;
}

export default function ProviderApp({children}:IProviderAppType) {
    return (
        <ProviderGrid>
            <ProviderFilter>
                <ProviderTag>
                    <ProviderFetcher>
                        {children}
                    </ProviderFetcher>
                </ProviderTag>
            </ProviderFilter>
        </ProviderGrid>
    )
}