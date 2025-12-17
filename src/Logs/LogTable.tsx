// react
import {useCallback, useEffect, useState} from "react";
// ag grid: core
import { AgGridReact } from 'ag-grid-react';
// ag grid: theme related
import { themeAlpine } from "ag-grid-community";
// global vars
import { useGrid } from "../Providers/ProviderGrid";
import { useFilter } from "../Providers/ProviderFilter";
// types
import { Row } from "../Types/Row";
// styling
import "./LogTable.css";

export default function LogTable() {
    // global vars
    const { gridRef, gridData, colDefs } = useGrid();
    const { setUniqueAccount, setUniqueSymbol } = useFilter();

    // store row/tuple data
    const [rowData, setRowData] = useState<Row[] | null>(null);

    // sends raw file to backend and retrieves split array
    const toBackend = useCallback( async () => {
        // send raw file
        await fetch("/api/upload",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({UserData: gridData})
            })
            // retrieve data and assign as row data
            .then(async res => {
                const data = await res.json();
                // assign data
                data?.data && setRowData(data.data);
                data?.uSymbol && setUniqueSymbol(data.uSymbol);
                data?.uAccount && setUniqueAccount(data.uAccount);
            })
            // handle any error that occurs
            .catch(error => {
                console.error("Error during fetch:", error);
            });
    }, [gridData, setUniqueAccount, setUniqueSymbol])

    // if user uploads a file, call toBackend (send data to backend)
    useEffect(() => {
        if(!gridData) return;
        toBackend();
    }, [gridData])

    return (
        <div className="GridContainer">
            <AgGridReact
                ref={gridRef}
                theme={themeAlpine}
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}