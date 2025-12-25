import {Box, Accordion, AccordionSummary, AccordionDetails, Typography, styled, Button, Divider, TextField} from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {HiddenInput} from "./LogToolbarMUI";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useGrid} from "../Providers/ProviderGrid";
import {Row} from "../Types/Row";
import {useTag} from "../Providers/ProviderTag";

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
        <Box sx={{m:2}}>
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
                    <Box sx={{m: 1, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <TextField
                            label={"Account Name"}
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                        />
                    </Box>
                    <Divider sx={{ml: 1, mr: 1, mt: 2, mb: 2}}/>
                    <Box sx={{m: 1, display: "flex", flexDirection: "column"}}>
                        <Box sx={{display: "grid", gridTemplateColumns: "50% 50%"}}>
                            <Box sx={{gridColumnStart: 1, gridColumnEnd: "span 1"}}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="small"
                                    sx={{width: "100%", color: "black", borderColor: "darkgray"}}
                                >
                                    Upload Log
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(e:any) => readInFile(e.target.files?.[0])}
                                        accept="csv"
                                    />
                                </Button>
                            </Box>
                            <Box sx={{gridColumnStart: 2, gridColumnEnd: "span 1", justifySelf: "center", alignSelf: "center", overflowX: "scroll"}}>
                                    <Typography variant="subtitle2">{rawString ? filename : "No file selected"}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ml: 1, mr: 1, mt: 2, mb: 2}}/>
                    <Box sx={{m: 1, display: "flex", flexDirection: "column", justifyContent: "center"}}>
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