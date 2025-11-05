// react
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
// global vars
import { useGrid } from "../Providers/ProviderGrid";
// mui components
import {Box, Button, Checkbox,
    FormControl, ListItem, ListItemText, MenuItem, Modal, Select, Stack, styled, Typography} from "@mui/material";

export default function LogToolbar() {
    // global vars
    const {setGridData, gridRef, colFields} = useGrid();
    // store user dataafalse
    const [rawString, setRawString] = useState<ArrayBuffer | string | null>(null);
    // selected cols
    const [colMap, setColMap] = useState(new Map<string, boolean>());
    // modal handler
    const [handleModal, setHandleModal] = useState<boolean>(false);
    // MUI: Styling
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: "15rem",
            },
        },
    };
    // MUI; hidden file upload form
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "fit-content",
        height: "80vh",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        overflowY: "scroll",
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        p: 4,
    };

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

    useEffect(() => {
        // leave if uploaded data is empty
        if(!rawString) return;
        // if data contains strings
        if (typeof rawString === "string") {
            // assign data
            setGridData(rawString);
        }
    }, [rawString, setGridData])

    const getVisibleColumns = useMemo(() => {
        return Object.keys(colMap).filter((f) => colMap.get(f))
    }, [colMap])

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

    const colVisibility = useCallback((arr:string, value:boolean) => {
        if(!gridRef.current) return
        gridRef?.current?.api?.setColumnsVisible([arr], value);
    }, [gridRef.current])

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
        <Stack direction="row" gap={1}>
            <Button
                style={{color: "black", borderColor: "black"}}
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
            <Button
                style={{color: "black", borderColor: "black"}}
                component="label"
                variant="outlined"
                size="small"
                onClick={() => setHandleModal(true)}>
                Manage Columns
            </Button>
            <Modal
                open={handleModal}
                onClose={() => setHandleModal(false)}>
                <Box sx={style}>
                        <Typography variant="h5" sx={{display: "flex", justifyContent: "center", pb: 2}}>Manage Column Visibility</Typography>
                        <FormControl>
                            {colFields.map((field) => (
                                <MenuItem
                                    sx={{display: "flex", justifyContent: "start", pl: 0}}
                                    key={field} value={field}>
                                    <Checkbox
                                        onChange={() => handleCheckbox(field)}
                                        checked={colMap.get(field)}/>
                                    <ListItemText
                                        primary={field}/>
                                </MenuItem>
                            ))}
                        </FormControl>
                </Box>
            </Modal>
        </Stack>
    )
}