// react
import React, {useCallback, useEffect, useMemo, useState} from "react";
// global vars
import {useGrid} from "../Providers/ProviderGrid";
import {useTag} from "../Providers/ProviderTag";
// mui components
import {Button, Stack, styled, TextField} from "@mui/material";
// mui styling
import {LogToolbarMUI, HiddenInput} from "./LogToolbarMUI";
// types
import {Row} from "../Types/Row";

export default function LogToolbar() {
    // global vars
    const {setGridData, gridRef, colDefs} = useGrid();
    const {tagDefs} = useTag();
    // account name
    const [accName, setAccName] = useState<string>("");
    // store user dataafalse
    const [rawString, setRawString] = useState<ArrayBuffer | string | null>(null);
    // MUI; hidden file upload form
    const VisuallyHiddenInput = styled('input')(HiddenInput);

    // read in and save user data
    const readInFile = useCallback((data:File | null) => {
        if(!data || !data?.type.startsWith("text/plain")) return;
        // read file
        const reader = new FileReader();
        reader.onload = () => {
            // save data
            setRawString(reader.result);
        }
        reader.readAsBinaryString(data);
    }, [])

    const noTagDefs = useMemo(() => {
        if(tagDefs.length < 1) return colDefs;
        const tempDefs = [...colDefs];
        return tempDefs.filter((i) => {
            const idx = tagDefs.indexOf(i);
            return idx < 0;
        })
    }, [colDefs, tagDefs])

    // initialize grid data
    useEffect(() => {
        // leave if uploaded data is empty
        if(!rawString) return;
        // if data contains strings
        if (typeof rawString === "string") {
            // assign data
            setGridData(rawString);
        }
    }, [rawString, setGridData])

    const saveNewAccount = useCallback(async() => {
        if(!gridRef?.current) return;
        // get row data
        const rowData:Row[] = []
        gridRef.current.api?.forEachNode((i) => {
            if(i?.data) rowData.push(i.data)
        });
        // send tags, cols, and row data to backend
        const res = await fetch("/api/saveNewAccount", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({accName: accName, rowData: rowData, colDefs: noTagDefs, tagDefs: tagDefs})
        })
        // if any error occurs, prompt error msg to console
        if (!res.ok) {
            const text = await res.text();
            console.error("HTTP error:", res.status, text);
        }
    }, [gridRef, noTagDefs, tagDefs, accName])

    return (
        <Stack direction="row" gap={1}>
            <Button
                sx={LogToolbarMUI.ButtonSx}
                component="label"
                variant="outlined"
                size="small"
            >
                Upload
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e:any) => readInFile(e.target.files?.[0])}
                    accept="csv"
                />
            </Button>
            <TextField
                size="small"
                value={accName}
                onChange={(e) => setAccName(e.target.value)}/>
            <Button
                variant="outlined"
                size="small"
                onClick={saveNewAccount}
                disabled={accName.length === 0}
                >Save account
            </Button>
        </Stack>
    )
}