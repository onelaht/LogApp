import {Box, CircularProgress, Typography } from "@mui/material";
import {useFetcher} from "../Providers/ProviderFetcher";
import {useCallback, useEffect, useRef} from "react";
import {useGrid} from "../Providers/ProviderGrid";
import {IAccount} from "../Types/IAccount";
import {LogFetcherMUI} from "./LogFetcherMUI";
import {IAccountData} from "../Types/IAccountData";

export default function LogFetcher() {
    // track prev state
    const prevAccounts = useRef<Map<string, IAccountData>| null>(null);
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
        // if not empty, initialize account map
        if(data?.accounts?.length > 0) {
            const temp:Map<string, IAccountData> = new Map<string, IAccountData>();
            data.accounts.forEach((i:IAccount) => {
                temp.set(i.AccName, i.Data);
            })
            setAccounts(temp);
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