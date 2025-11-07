// global var
import {useTag} from "../Providers/ProviderTag";
// mui commponents
import {Typography} from '@mui/material';

export default function LogTags() {
    const {tagMap} = useTag();

    return (
        <>
            {tagMap.size < 1 &&
                <Typography variant="h6"> No existing tags found </Typography>
            }
            <Typography variant="h6">Create new tag</Typography>
        </>
    )
}