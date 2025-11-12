// global var
import {useTag} from "../Providers/ProviderTag";
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
import {useCallback, useState} from "react";
import {useGrid} from "../Providers/ProviderGrid";
import {Row} from "../Types/Row";
import {ColDef, ISelectCellEditorParams} from "ag-grid-community";

export default function LogTags() {
    const {setColDefs} = useGrid();
    const {tagDefs, setTagDefs} = useTag();
    const [tagName, setTagName] = useState<string>("");
    const [parameters, setParameters] = useState<string[]>([""]);

    const handleParamChange = useCallback((value :string, index: number) => {
        const updateParams = parameters.map((p, i) => {
            if(i === index) return value;
            return p;
        })
        setParameters(updateParams);
    }, [parameters])

    const handleCreateTag = useCallback(() => {
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
    }, [tagName, parameters, tagDefs, setColDefs])

    const handleDeleteTag = useCallback((col:ColDef<Row>) => {
        setTagDefs(prev => {
            return [...prev].filter((i) => i !== col);
        })
        setColDefs(prev => {
            return [...prev].filter((i) => i !== col);
        })
    }, [setColDefs, setTagDefs])

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
                               <Box sx={{m: 1}}>
                                   <TextField
                                       label="Tag Name"
                                       value={i.field}/>
                               </Box>
                               <Divider sx={{ml: 1, mr: 1, mt: 2, mb: 2}}/>
                               <Box sx={{m: 1, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                   {i.cellEditorParams.values.map((j:string, index: number) => (
                                       <TextField
                                           sx={{pb: 1.5}}
                                           label={`Parameter ${index+1}`}
                                           value={j}/>
                                   ))}
                               </Box>
                               <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                   <Button
                                       sx={{ml: 1, mr: 1}}
                                       size="small"
                                       variant="outlined">
                                       Edit
                                   </Button>
                                   <Button
                                       sx={{ml: 1, mr: 1}}
                                       size="small"
                                       onClick={() => handleDeleteTag(i)}
                                       variant="outlined">
                                       Delete Tag
                                   </Button>
                               </Box>
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
                                onChange={(e) => handleParamChange(e.target.value, index)}
                            />
                        ))}
                        <Button
                            onClick={() => setParameters(prev => [...prev, ""])}>
                            Add parameter
                        </Button>
                        <Divider sx={{ml: 1, mr: 1, mt: 2, mb: 2}}/>
                        <Button
                            variant="outlined"
                            onClick={handleCreateTag}>
                            Create tag
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}