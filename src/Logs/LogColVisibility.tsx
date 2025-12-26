// react
import React, {useCallback, useEffect, useState} from "react";
// global vars
import {useGrid} from "../Providers/ProviderGrid";
// mui components
import {Box, Checkbox, FormControl, ListItemText, MenuItem} from "@mui/material";
// mui styling
import {LogColVisibilityMUI} from "./LogColVisibilityMUI";

export default function LogColVisibility() {
    // global vars
    const {gridRef, colFields} = useGrid();
    // selected cols
    const [colMap, setColMap] = useState<Map<string, boolean>>(new Map<string, boolean>());

    // initialize checkbox status
    // - <future imm> if retrieved from db, restore based on config
    // - otherwise, set all columns as visible
    useEffect(() => {
        const tempMap = new Map<string, boolean>();
        // set all as visible
        colFields.forEach((f) => {
            tempMap.set(f, true);
        })
        // use as column map
        setColMap(tempMap);
    }, [])

    // hide or show specified column
    // - no action is done if reference to grid is null
    const colVisibility = useCallback((arr:string, value:boolean) => {
        if(!gridRef.current) return
        gridRef?.current?.api?.setColumnsVisible([arr], value);
    }, [gridRef])

    // toggles visibility of specified column
    // - if column/field is not found, returns w/ no changes
    // - if column is found, inverses previous boolean state.
    const handleCheckbox = useCallback((field: string) => {
        // if not found return
        if(!colMap.has(field)) return;
        // update field status and map
        setColMap(prev => {
            const tempMap = new Map(prev);
            tempMap.set(field, !tempMap.get(field));
            colVisibility(field, !!tempMap.get(field));
            return tempMap;
        })
    }, [colMap, colVisibility])

    return (
        <Box sx={LogColVisibilityMUI.Container}>
            <FormControl>
                {colFields.map((field) => (
                    <MenuItem
                        sx={LogColVisibilityMUI.MenuItemSx}
                        key={field} value={field}>
                        <Checkbox
                            onChange={() => handleCheckbox(field)}
                            checked={!!colMap.get(field)}/>
                        <ListItemText
                            primary={field}/>
                    </MenuItem>
                ))}
            </FormControl>
        </Box>
    )
}