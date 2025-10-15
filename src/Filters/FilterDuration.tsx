// react
import React, {useCallback, useEffect, useMemo, useState} from 'react';
// ag grid
import {CustomFilterProps, useGridFilter} from "ag-grid-react";
import {DoesFilterPassParams} from "ag-grid-community";
// mui
import {Stack, TextField, Typography} from '@mui/material';

export default function FilterDuration ({onModelChange, colDef}: CustomFilterProps) {
    const [userValue, setUserValue] = useState<{hour: string, min: string, sec: string}>({
        hour: "00",
        min: "00",
        sec: "00",
    });

    return (
        <div style={{transform: "scale(0.85)"}}>
            <Stack direction="row" spacing={0} sx={{alignItems: "center"}}>
                <TextField
                    id="hour"
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
                />
                <Typography>:</Typography>
                <TextField
                    id="min"
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
                />
            </Stack>
        </div>
    )
}