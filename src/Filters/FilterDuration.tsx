// react
import React, {useCallback, useEffect, useMemo, useState} from 'react';
// ag grid
import {CustomFilterProps, useGridFilter} from "ag-grid-react";
import {DoesFilterPassParams} from "ag-grid-community";
// mui
import {Button, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography} from '@mui/material';

export default function FilterDuration ({onModelChange, colDef}: CustomFilterProps) {
    const [option, setOption] = useState<string>("");
    const [userValue, setUserValue] = useState<{hour: string|null, min: string|null, sec: string|null}>({
        hour: null,
        min: null,
        sec: null,
    });
    const [userValueInt, setUserValueInt] = useState<number|null>(null);

    const options:string[] = useMemo(() =>
        ["Greater than", "Less than", "Equal to", "Greater than or equal to", "Less than or equal to"], [])

    const convertToSec:number = useMemo(() => {
        const hour = !userValue.hour ? 0 : parseInt(userValue.hour);
        const min = !userValue.min ? 0 : parseInt(userValue.min);
        const sec = !userValue.sec ? 0 : parseInt(userValue.sec);
        return (hour * 3600) + (min * 60) + sec;
    }, [userValue])

    const handleOptionChange = useCallback((e:SelectChangeEvent) => {
        setOption(e.target.value);
    }, [setOption])

    const handleButtonChange = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
        onModelChange(userValueInt ? userValueInt: null);
    }, [onModelChange, userValueInt])

    const valueFormatter = useCallback((data:string|null) => {
        if(!data || data?.length > 2)
            return data
        return data?.padStart(2, "0");
    }, [])

    const evaluateConditional = useCallback((node:number) => {
        if(!userValueInt) return false;
        switch(option) {
            case "Less than":
                return node < userValueInt;
            case "Greater than": return node > userValueInt;
            case "Equal to": return node === userValueInt
            case "Greater than or equal to": return node >= userValueInt;
            case "Less than or equal to": return node <= userValueInt;
            default:  return false;
        }
    }, [option, userValueInt])

    const doesFilterPass = useCallback(({data}:DoesFilterPassParams) => {
        return (evaluateConditional(parseInt(data?.[colDef.field as string])));
    }, [colDef, evaluateConditional])

    useEffect(() => {
        (userValue.hour || userValue.min || userValue.sec) && setUserValueInt(convertToSec);
    }, [convertToSec])

    useGridFilter({doesFilterPass});

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", transform: "scale(0.85)"}}>
                <FormControl
                    fullWidth
                    size="small"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    sx={{marginBottom: "0.5rem"}}>
                    <Select<string>
                        value={option}
                        onChange={handleOptionChange}
                    >
                        {options.map((i:string) => {return <MenuItem value={i}>{i}</MenuItem>})}
                    </Select>
                </FormControl>
                <Stack direction="row" spacing={0} sx={{alignItems: "center"}}>
                    <TextField
                        id="hour"
                        value={userValue["hour"]}
                        onChange={e => setUserValue(prev => {
                            return {...prev, hour: e.target.value}
                        })}
                        onBlur={() => setUserValue(prev => {
                            return {...prev, hour: valueFormatter(userValue["hour"])}
                        })}
                        slotProps={{
                            htmlInput: {
                                maxLength: 2,
                                inputMode: 'string',
                                style: { textAlign: 'center', width: '2.5em' }
                            },
                        }}
                        size="small"
                        placeholder="HH"
                    />
                    <Typography>:</Typography>
                    <TextField
                        value={userValue["min"]}
                        onChange={e => setUserValue(prev => {
                            return {...prev, min: e.target.value}
                        })}
                        onBlur={() => setUserValue(prev => {
                            return {...prev, min: valueFormatter(userValue["min"])}
                        })}
                        slotProps={{
                            htmlInput: {
                                maxLength: 2,
                                inputMode: 'numeric',
                                style: { textAlign: 'center', width: '2.5em' }
                            },
                        }}
                        size="small"
                        placeholder="MM"
                    />
                    <Typography>:</Typography>
                    <TextField
                        value={userValue["sec"]}
                        onChange={e => setUserValue(prev => {
                            return {...prev, sec: e.target.value}
                        })}
                        onBlur={() => setUserValue(prev => {
                            return {...prev, sec: valueFormatter(userValue["sec"])}
                        })}
                        slotProps={{
                            htmlInput: {
                                maxLength: 2,
                                inputMode: 'numeric',
                                style: { textAlign: 'center', width: '2.5em' }
                            },
                        }}
                        size="small"
                        placeholder="SS"
                    />
                </Stack>
                <Button
                    onClick={handleButtonChange}
                    sx={{alignSelf: "flex-end"}}>
                    test
                </Button>
            </div>
        </>
    )
}