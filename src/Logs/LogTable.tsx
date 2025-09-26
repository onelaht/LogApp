// react
import {useCallback, useEffect, useMemo, useState} from "react";
// ag grid: core
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
// ag grid: theme related
import { themeAlpine } from "ag-grid-community";
// global vars
import { useGrid } from "../Providers/ProviderGrid";

export default function LogTable() {
    // global vars
    const { gridData } = useGrid();
    //
    interface IRowCol {
        [key: string] : string | number;
    }
    //
    const [colDefs, setColDefs] = useState<ColDef<IRowCol>[] | null>([
        {
            field: "Account",
        },
        {
            field: "Close Position Quantity",
        },
        {
            field: "Commission (C)",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["Commission (C)"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Cumulative Profit/Loss (C)",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["Cumulative Profit/Loss (C)"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Duration",
        },
        {
            field: "Entry DateTime",
        },
        {
            field: "Entry Efficiency",
        },
        {
            field: "Entry Price",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["Entry Price"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Exit DateTime",
        },
        {
            field: "Exit Efficiency",
        },
        {
            field: "Exit Price",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["Exit Price"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "FlatToFlat Max Open Loss (C)",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["FlatToFlat Max Open Loss (C)"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "FlatToFlat Max Open Profit (C)",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["FlatToFlat Max Open Profit (C)"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "FlatToFlat Profit/Loss (C)",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["FlatToFlat Profit/Loss (C)"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "High Price While Open",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["High Price While Open"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Low Price While Open",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["Low Price While Open"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Max Closed Quantity",
        },
        {
            field: "Max Open Loss (C)",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["Max Open Loss (C)"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Max Open Profit (C)",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["Max Open Profit (C)"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Max Open Quantity",
        },
        {
            field: "Note",
        },
        {
            field: "Open Position Quantity",
        },
        {
            field: "Profit/Loss (C)",
            cellDataType: "number",
            valueGetter: (p:any) => {return parseFloat(p.data?.["Profit/Loss (C)"])},
            valueFormatter: (p) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Symbol",
        },
        {
            field: "Total Efficiency",
        },
        {
            field: "Total Efficiency",
        },
        {
            field: "Trade Quantity",
        },
        {
            field: "Trade Type",
        }
    ])
    //
    const [rowData, setRowData] = useState<IRowCol[] | null>(null);

    //
    const toBackend = useCallback( async () => {
        await fetch("/api/upload",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({UserData: gridData})
            })
            .then(async res => {
                // Use the retrieved data
                const data = await res.json();
                setRowData(data.data);
            })
            .catch(error => {
                // Handle any errors during the fetch operation
                console.error("Error during fetch:", error);
            });
    }, [gridData, setRowData])

    useEffect(() => {
        if(!gridData) return;
        toBackend();
    }, [gridData])

    return (
        // Data Grid will fill the size of the parent container
        <div style={{ height: "100vh", width: "100vw"}}>
            <AgGridReact
                theme={themeAlpine}
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}