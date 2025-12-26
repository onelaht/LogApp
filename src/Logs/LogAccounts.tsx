// react
import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
// MUI
import {Box, Accordion, AccordionSummary, AccordionDetails,
        Typography, styled, Button, Divider, TextField} from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// MUI styling
import {HiddenInput, LogAccountsMUI} from "./LogAccountsMUI";
// global vars
import {useGrid} from "../Providers/ProviderGrid";
import {useTag} from "../Providers/ProviderTag";
// types
import {Row} from "../Types/Row";

export default function LogAccounts() {
    // global vars
    const {setGridData, gridRef, colDefs} = useGrid();
    const {tagDefs} = useTag();
    // MUI; hidden file upload form
    const VisuallyHiddenInput = styled('input')(HiddenInput);
    // store account name
    const [accountName, setAccountName] = useState<string>("");
    // store filename
    const [filename, setFilename] = useState<string>("");
    // store user log file
    const [rawString, setRawString] = useState<ArrayBuffer | string | null>(null);

    // read in and save user data
    const readInFile = useCallback((data:File | null) => {
        if(!data || !data?.type.startsWith("text/plain")) return;
        // assign filename received
        setFilename(data.name);
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

    // splits sc defs from user-defined tags
    const unsplitDef = useMemo(() => {
        // return existing defs if no tags are found
        if(tagDefs.length < 1) return colDefs;
        // copy column defs
        const tempDefs = [...colDefs];
        // filter out tag defs
        return tempDefs.filter((i) => {
            const idx = tagDefs.indexOf(i);
            return idx < 0;
        })
    }, [colDefs, tagDefs])

    // save data as new account
    const createAccount = useCallback(async () => {
        if(!gridRef?.current) return;
        // get row data
        const rowData:Row[] = [];
        gridRef.current.api?.forEachNode((i) => {
            if(i?.data) rowData.push(i.data);
        });
        // send data to backend
        const res = await fetch("api/saveNewAccount", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({accName: accountName, rowData: rowData, colDefs: unsplitDef, tagDefs: tagDefs})
        });
        // if any error occurs, prompt err msg to console
        if(!res.ok) {
            const text = await res.text();
            console.error("Error occurred in createAccount():", res.status, text);
        }
    }, [gridRef, unsplitDef, tagDefs, accountName])

    return (
        <Box sx={LogAccountsMUI.Container}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography> Accounts </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    test
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Create new account</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={LogAccountsMUI.TabFlexCenteredContainer}>
                        <TextField
                            label={"Account Name"}
                            value={accountName}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => setAccountName(e.target.value)}
                        />
                    </Box>
                    <Divider sx={LogAccountsMUI.Divider}/>
                    <Box sx={LogAccountsMUI.TabFlexContainer}>
                        <Box sx={LogAccountsMUI.UploadGridContainer}>
                            <Box sx={LogAccountsMUI.UploadGridCol1}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="small"
                                    sx={LogAccountsMUI.UploadButton}
                                >
                                    Upload Log
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(e:ChangeEvent<HTMLInputElement>) =>
                                            readInFile(e.target.files?.[0] ?? null)}
                                        accept="csv"
                                    />
                                </Button>
                            </Box>
                            <Box sx={LogAccountsMUI.UploadGridCol2}>
                                    <Typography variant="subtitle2">
                                        {rawString ? filename : "No file selected"}
                                    </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={LogAccountsMUI.Divider}/>
                    <Box sx={LogAccountsMUI.TabFlexCenteredContainer}>
                        <Button
                            variant="outlined"
                            disabled={!rawString || accountName === ""}
                            onClick={createAccount}>
                            Save Account
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}