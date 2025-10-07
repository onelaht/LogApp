import React, {createContext, ReactNode, useContext, useRef, useState} from 'react';
import type { Row } from "../Types/types"
import {AgGridReact} from "ag-grid-react";

interface IGridContextType {
    gridRef: React.RefObject<AgGridReact<Row> | null>;
    gridData: string | null;
    setGridData: React.Dispatch<React.SetStateAction<string | null>>;
}

const GridContext = createContext<IGridContextType | null>(null);

export default function ProviderGrid({children}:{children: ReactNode}) {
    const gridRef = useRef<AgGridReact<Row> | null>(null);
    const [gridData, setGridData] = useState<string | null>(null);
    return(
        <GridContext value={{gridRef, gridData, setGridData}}>
            {children}
        </GridContext>
    )
}

export const useGrid = () => {
    const context = useContext(GridContext);
    if(!context) throw new Error("GridContext must be used within a provider.");
    return context;
}