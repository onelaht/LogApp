// react
import {useCallback} from "react";
// mui components
import {Button, styled} from "@mui/material";
// csv reader
import Papa from "papaparse";

export default function LogToolbar() {
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
    //
    const onChangedInputHandler = useCallback((e: any) => {
        Papa.parse(e.target.files?.[0], {
            header: true,
            skipEmptyLines: true,
            complete: function(results: any) {
                console.log(results.data);
            }
        })
    }, [])
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
                    onChange={(e:any) => onChangedInputHandler(e)}
                    accept="csv"
                />
            </Button>
        </>
    )
}