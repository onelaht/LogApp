import {Box, Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function LogAccounts() {
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
                    fdfd
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}