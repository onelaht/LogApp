import {Box, CircularProgress, Typography } from "@mui/material";
import {useFetcher} from "../Providers/ProviderFetcher";
import {useCallback, useEffect, useRef} from "react";
import {useGrid} from "../Providers/ProviderGrid";
import {IAccount} from "../Types/IAccount";
import {LogFetcherMUI} from "./LogFetcherMUI";

export default function LogFetcher() {
    // track prev state
    const prevAccounts = useRef<IAccount[] | null>(null);
    // global vars
    const {setFetched} = useFetcher();
    const {accounts, setAccounts} = useGrid();

    // retrieve accounts from backend
    const fetchAccounts = useCallback(async () => {
        // fetch data
        const res = await fetch("/api/retrieveAccounts")
        // if any error occurs
        if(!res.ok) {
            const err = res.text();
            console.error("Error occurred in fetchAccounts: ", res.status, err);
        }
        // get values
        const data = await res.json();
        // if not empty
        if(data?.accounts?.length > 0) {
            setAccounts(data.accounts);
            prevAccounts.current = data.accounts;
        }
        setFetched(true);
    }, [setAccounts, setFetched, prevAccounts])

    // get account list
    useEffect(() => {
        if(JSON.stringify(prevAccounts?.current) !== JSON.stringify(accounts)) {
            setFetched(false);
            fetchAccounts();
        }
    }, [accounts, fetchAccounts, setFetched])

    return (
        <Box sx={LogFetcherMUI.Container}>
            <CircularProgress sx={LogFetcherMUI.Spinner}/>
            <Typography sx={LogFetcherMUI.Text}>Loading data...</Typography>
        </Box>
    )
}