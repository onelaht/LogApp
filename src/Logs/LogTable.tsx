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
    const [colDefs, setColDefs] = useState<ColDef<IRowCol>[] | null>(null)
    //
    const [rowData, setRowData] = useState<IRowCol[] | null>(null);
    //
    const createGridData = useCallback(() => {
        if(gridData?.length) {
            const tempRows:IRowCol[] = [];
            const tempCol:ColDef<IRowCol>[] = [];
            for(let i:number = 0; i < gridData.length; i++) {
                // if empty, skip
                if(!gridData[i]) continue;
                // retrieve col header
                if(i === 0) {
                    for(let j:number = 0; j < gridData[i].length; j++) {
                        tempCol.push({"field": gridData[i][j]});
                    }
                    // set col header
                    setColDefs(tempCol);
                // retrieve row data
                } else {
                    let tempRow:any = {}
                    if(!gridData[i][0]) continue;
                    // build each row
                    for(let j:number = 0; j < gridData[i].length; j++){
                        tempRow[`${tempCol[j].field}`] = gridData[i][j];
                    }
                    tempRows.push(tempRow);
                }
            }
            // set row data
            setRowData(tempRows);
        }
    }, [gridData])
    //

    const toBackend = useCallback( async () => {
        await fetch("/api/upload",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({UserData: gridData})
            })
            .then(responseData => {
                // Use the retrieved data
                console.log("Data retrieved:", responseData);
            })
            .catch(error => {
                // Handle any errors during the fetch operation
                console.error("Error during fetch:", error);
            });
    }, [gridData])

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