// react
import React, {ChangeEvent, useCallback, useState} from "react";
// global vars
import {useTag} from "../Providers/ProviderTag";
import {useGrid} from "../Providers/ProviderGrid";
// types
import {Row} from "../Types/Row";
import {ColDef, ISelectCellEditorParams} from "ag-grid-community";
// mui commponents
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    TextField,
    Typography
} from '@mui/material';
// mui icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function LogTags() {
    // global vars
    const {setColDefs} = useGrid();
    const {tagDefs, setTagDefs} = useTag();
    // track tags with edit mode enabled
    const [edit, setEdit] = useState<string>("");
    // assign tag and params (new tags)
    const [tagName, setTagName] = useState<string>("");
    const [parameters, setParameters] = useState<string[]>([""]);
    // assign tag and params (existing tags)
    const [draftTagName, setDraftTagName] = useState<string>("");
    const [draftParameters, setDraftParameters] = useState<string[]>([""]);

    // build new tag and push to column list
    const handleNewTag = useCallback(() => {
        // build new tag
        const col:ColDef<Row> = {
            field: tagName,
            editable: true,
            cellDataType: "text",
            filter: "agTextColumnFilter",
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: parameters
            } as ISelectCellEditorParams,
        }
        // track tag column
        setTagDefs(prev => {
            const tempDefs = [...prev];
            tempDefs.push(col);
            return tempDefs;
        })
        // add to column list
        setColDefs(prev => {
            const tempDefs = [...prev];
            tempDefs.push(col);
            return tempDefs;
        })
    }, [tagName, parameters, setColDefs, setTagDefs])

    // removes tag from column list
    const handleDeleteTag = useCallback((col:ColDef<Row>) => {
        setTagDefs(prev => {
            return [...prev].filter((i) => i !== col);
        })
        setColDefs(prev => {
            return [...prev].filter((i) => i !== col);
        })
    }, [setColDefs, setTagDefs])

    // update parameter value when updated
    const handleParametersChange = (value: string, index: number, handler:React.Dispatch<React.SetStateAction<string[]>>) => {
        handler(prev => {
            return prev.map((p:string, i:number) => {
                if(index === i) return value;
                return p;
            })
        })
    }

    // update edit tracker and copy current tag name/params for revision
    const handleEditState = useCallback((col:ColDef<Row>, ) => {
        (col.field === edit) ? setEdit("") : setEdit(col.field as string);
        // initialize draft values from current definition
        setDraftTagName(col.field as string);
        setDraftParameters(() => {
            return [...col.cellEditorParams.values];
        })
    }, [edit])

    // update tag based on user input and update column list
    const handleExistingTag = useCallback((oldTag:ColDef<Row>) => {
        // build revised tag
        const newTag:ColDef<Row> = {
            field: draftTagName,
            editable: true,
            cellDataType: "text",
            filter: "agTextColumnFilter",
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: draftParameters
            } as ISelectCellEditorParams,
        }
        // update coldefs
        setColDefs(prev => {
            return prev.map((i) => {
                if (i.field === oldTag.field)
                    return newTag;
                return i;
            });
        })
        // update tag tracker
        setTagDefs(prev => {
            return prev.map((i) => {
                if(i.field === oldTag.field)
                    return newTag;
                return i;
            })
        })
    }, [draftTagName, draftParameters, setColDefs, setTagDefs])

    return (
        <Box sx={{m:2}}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="body1">Current tags ({tagDefs.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {tagDefs.length < 1 &&
                        <Typography variant="body2">No Tags Found</Typography>
                    }
                    {tagDefs.length >= 1 && tagDefs.map((i) => (

                       <Accordion>
                           <AccordionSummary
                               expandIcon={<ExpandMoreIcon/>}>
                               <Typography variant="body1">{i.field}</Typography>
                           </AccordionSummary>
                           <AccordionDetails>
                               <Box sx={{pb: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                   <Button
                                       sx={{ml: 1, mr: 1}}
                                       size="small"
                                       onClick={() => handleEditState(i)}>
                                       {edit === i.field as string ? "Disable Edit" : "Enable Edit"}
                                   </Button>
                                   <Button
                                       sx={{ml: 1, mr: 1}}
                                       size="small"
                                       onClick={() => handleDeleteTag(i)}>
                                       Delete
                                   </Button>
                               </Box>
                               <Box sx={{m: 1}}>
                                   <TextField
                                       label="Tag Name"
                                       disabled={edit !== i.field as string}
                                       onChange={(e:ChangeEvent<HTMLInputElement>) => setDraftTagName(e.target.value)}
                                       value={edit !== i.field ? i.field : draftTagName}/>
                               </Box>
                               <Divider sx={{ml: 1, mr: 1, mt: 2, mb: 2}}/>
                               <Box sx={{m: 1, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                   {edit === i.field as string && draftParameters.map((j:string, index: number) => (
                                       <TextField
                                           sx={{pb: 1.5}}
                                           disabled={false}
                                           onChange={(e) => handleParametersChange(e.target.value, index, setDraftParameters)}
                                           label={`Parameter ${index+1}`}
                                           value={j}/>
                                   ))}
                                   {edit !== i.field as string && i.cellEditorParams.values.map((j:string, index: number) => (
                                       <TextField
                                           sx={{pb: 1.5}}
                                           disabled={true}
                                           label={`Parameter ${index+1}`}
                                           value={j}/>
                                   ))}
                               </Box>
                               {edit === i.field as string &&
                                   <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                       <Button
                                           onClick={() => setDraftParameters(prev =>  [...prev, ""])}>
                                           Add Parameter
                                       </Button>
                                       <Button
                                           onClick={() => handleExistingTag(i)}>
                                           Save Changes
                                       </Button>
                                   </Box>
                               }
                           </AccordionDetails>
                       </Accordion>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="body1">Create new tag</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{m: 1}}>
                        <TextField
                            label="Tag Name"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}/>
                    </Box>
                    <Divider sx={{ml: 1, mr: 1, mt: 2, mb: 2}}/>
                    <Box sx={{m: 1, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        {parameters.map((param, index) => (
                            <TextField
                                sx={{pb: 1.5}}
                                label={`Parameter ${index+1}`}
                                value={param}
                                onChange={(e) => handleParametersChange(e.target.value, index, setParameters)}
                            />
                        ))}
                        <Button
                            onClick={() => setParameters(prev => [...prev, ""])}>
                            Add parameter
                        </Button>
                        <Divider sx={{ml: 1, mr: 1, mt: 2, mb: 2}}/>
                        <Button
                            variant="outlined"
                            onClick={handleNewTag}>
                            Create tag
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}