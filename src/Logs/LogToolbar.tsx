// react
import {useCallback, useEffect, useState} from "react";
// global vars
import { useGrid } from "../Providers/ProviderGrid";
// mui components
import {Button, styled} from "@mui/material";

export default function LogToolbar() {
    const [rawString, setRawString] = useState<ArrayBuffer | string | null>(null);
    const { setColDef } = useGrid();

    const readInFile = useCallback((data:File | null) => {
        if(!data || !data?.type.startsWith("text/plain")) return;
        // read file
        const reader = new FileReader();
        reader.onload = () => {
            setRawString(reader.result);
        }
        reader.readAsBinaryString(data);
    }, [])

    useEffect(() => {
        if(!rawString) return;
        if (typeof rawString === "string") {
            // split each line
            const stringLine:string[] = rawString.split("\n");
            // split based on tab
            stringLine[1].split("\t").forEach((i) => console.log(i));
        }
    }, [rawString])

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
        <>
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
        </>
    )
}