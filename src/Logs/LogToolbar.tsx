// react
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
// global vars
import { useGrid } from "../Providers/ProviderGrid";
// mui components
import {Box, Button, Checkbox, FormControlLabel, FormGroup, InputLabel, ListItemText, MenuItem, Modal, Select, Stack, styled, Typography} from "@mui/material";

export default function LogToolbar() {
    // global vars
    const {setGridData, gridRef, colFields} = useGrid();
    // store user dataafalse
    const [rawString, setRawString] = useState<ArrayBuffer | string | null>(null);
    // selected cols
    const [selectedCols, setSelectedCols] = useState<string[]>([]);
    // MUI related
    const [colModalState, setColModalState] = useState<boolean>(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '25%',
        bgcolor: 'background.paper',
        border: '2px solid #808080',
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

    // from MUI docs; hidden file upload form
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
                onClick={() => setColModalState(true)}
            >
                Manage SC Columns
            </Button>
            <Modal
                hideBackdrop
                open={colModalState}
                onClose={() => setColModalState(false)}
                sx={style}
                >
                    <div style={{display: "flex"}}>
                        <Button sx={{alignItems: "flex-end", justifyContent: "flex-end"}}>Close</Button>
                    </div>
            </Modal>
        </Stack>
    )
}