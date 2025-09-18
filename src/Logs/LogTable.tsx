// react
import { useState } from "react";
// ag grid: core
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
// ag grid: theme related
import { themeAlpine } from "ag-grid-community";

export default function LogTable() {
    interface  IRow {
        make: string;
        model: string;
        price: number;
        electric: boolean;
    }

    // Row Data: The data to be displayed.
    const [rowData] = useState<IRow[]>([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs] = useState<ColDef<IRow>[]>([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);
    const defaultColDef: ColDef = {
        flex: 1,
    };
    return (
        // Data Grid will fill the size of the parent container
        <div style={{ height: "100vh", width: "100vw"}}>
            <AgGridReact
                theme={themeAlpine}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    )
}