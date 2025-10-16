// react
import React, {useCallback, useEffect, useMemo, useState} from 'react';
// ag grid
import {CustomFilterProps, useGridFilter} from "ag-grid-react";
import {DoesFilterPassParams} from "ag-grid-community";
// mui
import {FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography} from '@mui/material';

export default function FilterDuration ({onModelChange, colDef}: CustomFilterProps) {
    const [option, setOption] = useState<string>("");
    const [userValue, setUserValue] = useState<{hour: string|null, min: string|null, sec: string|null}>({
        hour: null,
        min: null,
        sec: null,
    });

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
        onModelChange(e.target.value ? e.target.value : null);
    }, [setOption, onModelChange])

    return (
        <>
            <div style={{transform: "scale(0.85)"}}>
                <FormControl
                    fullWidth
                    size="small"
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
                        value={userValue["hour"]}
                        onChange={e => setUserValue(prev => {
                            return {...prev, hour: e.target.value}
                        })}
                        slotProps={{
                            htmlInput: {
                                maxLength: 2,
                                inputMode: 'numeric',
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
            </div>
        </>
    )
}