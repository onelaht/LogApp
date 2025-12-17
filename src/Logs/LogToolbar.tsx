// react
import React, {useCallback, useEffect, useState} from "react";
// global vars
import { useGrid } from "../Providers/ProviderGrid";
// mui components
import {Button, Stack, styled} from "@mui/material";
// mui styling
import {LogToolbarMUI, HiddenInput} from "./LogToolbarMUI";

export default function LogToolbar() {
    // global vars
    const {setGridData} = useGrid();
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
        </Stack>
    )
}