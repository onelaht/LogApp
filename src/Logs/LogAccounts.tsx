import {Box, Accordion, AccordionSummary, AccordionDetails, Typography, styled, Button, Divider, TextField} from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {HiddenInput} from "./LogToolbarMUI";
import React, {useCallback, useEffect, useState} from "react";
import {useGrid} from "../Providers/ProviderGrid";

export default function LogAccounts() {
    // global vars
    const {setGridData} = useGrid();
    // MUI; hidden file upload form
    const VisuallyHiddenInput = styled('input')(HiddenInput);
    // store user dataafalse
    const [filename, setFilename] = useState<string>("");
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
                                >
                                    Upload Log
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(e:any) => readInFile(e.target.files?.[0])}
                                        accept="csv"
                                    />
                                </Button>
                            </Box>
                            <Box sx={{gridColumnStart: 2, gridColumnEnd: "span 1", alignSelf: "center", overflowX: "scroll"}}>
                                    <Typography variant="subtitle2">{rawString ? filename : "No file selected"}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ml: 1, mr: 1, mt: 2, mb: 2}}/>
                    <Box sx={{m: 1, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <Button variant="outlined">Save Account</Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}