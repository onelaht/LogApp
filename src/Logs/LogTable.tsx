// react
import {useCallback, useEffect, useMemo, useState} from "react";
// ag grid: core
import type {ColDef, ValueGetterParams, ValueFormatterParams} from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
// ag grid: theme related
import { themeAlpine } from "ag-grid-community";
// global vars
import { useGrid } from "../Providers/ProviderGrid";
import { useFilter } from "../Providers/ProviderFilter";
//
import { Row } from "../Types/types";
// custom filter
import FilterCheckboxSet from "../Filters/FilterCheckboxSet";

export default function LogTable() {
    // global vars
    const { gridRef, gridData } = useGrid();
    const { setUniqueAccount, setUniqueSymbol } = useFilter();

    // definitions of grid columns
    // - specifies data type used
    // - specifies filter type
    // - implements apply and reset butttons
    const colDefs:ColDef<Row>[] = useMemo(() => [
        {
            field: "Entry DateTime",
            cellDataType: "dateTimeString",
            filter: "agDateColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
        },
        {
            field: "Exit DateTime",
            cellDataType: "dateTimeString",
            filter: "agDateColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
        },
        {
            field: "Duration",
            cellDataType: "text",
            filterParams: {
                buttons: ["apply", "reset"],
            },
        },
        {
            field: "Symbol",
            cellDataType: "text",
            filter: FilterCheckboxSet,
        },
        {
            field: "Trade Type",
            cellDataType: "text",
            filter: FilterCheckboxSet,
        },
        {
            field: "Entry Price",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Entry Price"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Exit Price",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Exit Price"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Low Price While Open",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Low Price While Open"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "High Price While Open",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["High Price While Open"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Profit/Loss (C)",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Profit/Loss (C)"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Max Open Profit (C)",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Max Open Profit (C)"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Max Open Loss (C)",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Max Open Loss (C)"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Commission (C)",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Commission (C)"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Trade Quantity",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseInt(p.data?.["Trade Quantity"])}
        },
        {
            field: "Open Position Quantity",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseInt(p.data?.["Open Position Quantity"])}
        },
        {
            field: "Close Position Quantity",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseInt(p.data?.["Close Position Quantity"])}
        },
        {
            field: "Max Open Quantity",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseInt(p.data?.["Max Open Quantity"])}
        },
        {
            field: "Max Closed Quantity",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            filterParams: {
                buttons: ["apply", "reset"],
            },
            valueGetter: (p:ValueGetterParams) => {return parseInt(p.data?.["Max Closed Quantity"])}
        },
        {
            field: "Entry Efficiency",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Entry Efficiency"])},
            valueFormatter: (p:any) => {return (p.value).toFixed(2) + "%"}
        },
        {
            field: "Exit Efficiency",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Exit Efficiency"])},
            valueFormatter: (p:any) => {return (p.value).toFixed(2) + "%"}
        },
        {
            field: "Total Efficiency",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["Total Efficiency"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value).toFixed(2) + "%"}
        },
        {
            field: "FlatToFlat Profit/Loss (C)",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["FlatToFlat Profit/Loss (C)"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "FlatToFlat Max Open Loss (C)",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["FlatToFlat Max Open Loss (C)"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "FlatToFlat Max Open Profit (C)",
            cellDataType: "number",
            filter: "agNumberColumnFilter",
            valueGetter: (p:ValueGetterParams) => {return parseFloat(p.data?.["FlatToFlat Max Open Profit (C)"])},
            valueFormatter: (p:ValueFormatterParams) => {return (p.value?.toFixed(2))}
        },
        {
            field: "Note",
            cellDataType: "text",
        },
    ], [])

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
    }, [gridData, setRowData])

    // if user uploads a file, call toBackend (send data to backend)
    useEffect(() => {
        if(!gridData) return;
        toBackend();
    }, [gridData])

    return (
        <div style={{ height: "100vh", width: "100vw"}}>
            <AgGridReact
                ref={gridRef}
                theme={themeAlpine}
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}