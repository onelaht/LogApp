// react
import React, {useCallback, useMemo, useState} from 'react';
// ag grid
import {CustomFilterProps, useGridFilter} from "ag-grid-react";
import {DoesFilterPassParams} from "ag-grid-community";
// mui
import {
    Button,
    FormControl,
    FormControlLabel,
    MenuItem, Radio, RadioGroup,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from '@mui/material';
// types
import {ITimeFilterArgs} from "../Types/ITimeFilterArgs";
import {ITimeFormat} from "../Types/ITimeFormat";

export default function FilterDuration ({onModelChange, colDef}: CustomFilterProps) {
    const [args, setArgs] = useState<ITimeFilterArgs>({
        first: {
            userInput: {
                hour: "",
                min: "",
                sec: "",
            },
            filter: "",
        },
        second: {
            userInput: {
                hour: "",
                min: "",
                sec: "",
            },
            filter: "",
        }
    })

    const [radio, setRadio] = useState<string>("AND");

    const filters:string[] = useMemo(() =>
        ["Greater than", "Less than", "Equal to", "Greater than or equal to", "Less than or equal to"], [])

    const convertToSec = useCallback((val:ITimeFormat) => {
        const hour = val.hour !== "" ? parseInt(val.hour) * 3600 : 0;
        const min = val.min !== "" ? parseInt(val.min) * 60 : 0;
        const sec = val.min !== "" ? parseInt(val.min) : 0;
        return hour + min + sec;
    }, [])

    const doesContainInput = useCallback((val:ITimeFormat) => {
        return val.hour !== "" || val.min !== "" || val.sec !== "";
    }, [])

    const valueFormatter = useCallback((data:string) => {
        if(!data || data?.length > 2)
            return data
        return data?.padStart(2, "0");
    }, [])

    const evaluate = useCallback((node:number, value:number, filter:string) => {
        if(!value) return false;
        switch(filter) {
            case "Less than":
                return node < value;
            case "Greater than": return node > value;
            case "Equal to": return node === value
            case "Greater than or equal to": return node >= value;
            case "Less than or equal to": return node <= value;
            default:  return false;
        }
    }, [])

    const handleOptionChange = useCallback((e:SelectChangeEvent) => {
        const argType = e.target.name as keyof ITimeFilterArgs
        setArgs(prev => ({
            ...prev, [argType]: {
                ...prev[argType], filter: e.target.value
            }
        }))
    }, [])

    const handleApplyButton = useCallback(() => {
        onModelChange(args ? args : null)
    }, [onModelChange, args])

    const doesFilterPass = useCallback(({data}:DoesFilterPassParams) => {
        const node = parseInt(data[colDef?.field as string]);
        const firstArg = (args.first.filter !== "" && doesContainInput(args.first.userInput)) ?
            convertToSec(args.first.userInput) : -1;
        const secondArg = (args.second.filter !== "" && doesContainInput(args.second.userInput)) ?
            convertToSec(args.second.userInput) : -1;
        if(firstArg === -1 && secondArg === -1)
            return false;
        if(secondArg === -1)
            return evaluate(node, firstArg, args.first.filter);
        if(radio === "AND")
        {
            console.log("here")
            return evaluate(node, firstArg, args.first.filter) && evaluate(node, secondArg, args.second.filter);
        }
        else
            return evaluate(node, firstArg, args.first.filter) || evaluate(node, secondArg, args.second.filter);
    }, [colDef, args, doesContainInput, convertToSec, evaluate, radio])

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
                        name="first"
                        value={args.first.filter}
                        onChange={handleOptionChange}
                    >
                        {filters.map((i:string) => {return <MenuItem value={i}>{i}</MenuItem>})}
                    </Select>
                </FormControl>
                <Stack direction="row" spacing={0} sx={{alignItems: "center"}}>
                    <TextField
                        id="hour"
                        value={args.first.userInput.hour}
                        onChange={e => setArgs(prev => {
                            return {...prev, first: {...prev.first, userInput:
                                        {...prev.first.userInput, hour: e.target.value}
                                }}
                        })}
                        onBlur={() => setArgs(prev => {
                            return {...prev, first: {...prev.first, userInput:
                                        {...prev.first.userInput, hour: valueFormatter(args.first.userInput.hour)}
                                }}
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
                        disabled={args.first.filter === ""}
                    />
                    <Typography>:</Typography>
                    <TextField
                        value={args.first.userInput.min}
                        onChange={e => setArgs(prev => {
                            return {...prev, first: {...prev.first, userInput:
                                        {...prev.first.userInput, min: e.target.value}
                            }}
                        })}
                        onBlur={() => setArgs(prev => {
                            return {...prev, first: {...prev.first, userInput:
                                        {...prev.first.userInput, min: valueFormatter(args.first.userInput.min)}
                            }}
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
                        disabled={args.first.filter === ""}
                    />
                    <Typography>:</Typography>
                    <TextField
                        value={args.first.userInput.sec}
                        onChange={e => setArgs(prev => {
                            return {...prev, first: {...prev.first, userInput:
                                        {...prev.first.userInput, sec: e.target.value}
                                }}
                        })}
                        onBlur={() => setArgs(prev => {
                            return {...prev, first: {...prev.first, userInput:
                                        {...prev.first.userInput, sec: valueFormatter(args.first.userInput.sec)}
                                }}
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
                        disabled={args.first.filter === ""}
                    />
                </Stack>
                {(args.first.userInput?.min || args.first.userInput?.hour || args.first.userInput?.sec) && (
                    <>
                        <FormControl sx={{alignSelf: "center"}}>
                            <RadioGroup
                                row
                                value={radio}
                                onChange={e => {setRadio(e.target.value)}}>
                                <FormControlLabel value={"AND"} control={<Radio/>} label={"AND"}/>
                                <FormControlLabel value={"OR"} control={<Radio/>} label={"OR"}/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl
                            fullWidth
                            size="small"
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            sx={{marginBottom: "0.5rem"}}>
                            <Select<string>
                                name="second"
                                value={args.second.filter}
                                onChange={handleOptionChange}
                            >
                                {filters.map((i:string) => {return <MenuItem value={i}>{i}</MenuItem>})}
                            </Select>
                        </FormControl>
                        <Stack direction="row" spacing={0} sx={{alignItems: "center"}}>
                            <TextField
                                id="hour"
                                value={args.second.userInput.hour}
                                onChange={e => setArgs(prev => {
                                    return {...prev, second: {...prev.second, userInput:
                                                {...prev.second.userInput, hour: e.target.value}
                                        }}
                                })}
                                onBlur={() => setArgs(prev => {
                                    return {...prev, second: {...prev.second, userInput:
                                                {...prev.second.userInput, hour: valueFormatter(args.second.userInput.hour)}
                                        }}
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
                                disabled={args.second.filter === ""}
                            />
                            <Typography>:</Typography>
                            <TextField
                                value={args.second.userInput.min}
                                onChange={e => setArgs(prev => {
                                    return {...prev, second: {...prev.second, userInput:
                                                {...prev.second.userInput, min: e.target.value}
                                        }}
                                })}
                                onBlur={() => setArgs(prev => {
                                    return {...prev, second: {...prev.second, userInput:
                                                {...prev.second.userInput, min: valueFormatter(args.second.userInput.min)}
                                        }}
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
                                disabled={args.second.filter === ""}
                            />
                            <Typography>:</Typography>
                            <TextField
                                value={args.second.userInput.sec}
                                onChange={e => setArgs(prev => {
                                    return {...prev, second: {...prev.second, userInput:
                                                {...prev.second.userInput, sec: e.target.value}
                                        }}
                                })}
                                onBlur={() => setArgs(prev => {
                                    return {...prev, second: {...prev.second, userInput:
                                                {...prev.second.userInput, sec: valueFormatter(args.second.userInput.sec)}
                                        }}
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
                                disabled={args.second.filter === ""}
                            />
                        </Stack>
                    </>
                )}
                <Stack direction="row" gap={1} sx={{alignSelf: "flex-end", marginTop: "1rem"}}>
                    <Button
                        variant="outlined"
                        onClick={handleApplyButton}>
                        Apply
                    </Button>
                    <Button variant="outlined">
                        Reset
                    </Button>
                </Stack>
            </div>
        </>
    )
}