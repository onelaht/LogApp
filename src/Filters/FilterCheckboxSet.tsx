// react
import React, {useCallback, useEffect, useMemo, useState} from 'react';
// ag grid
import {CustomFilterCallbacks, CustomFilterProps, useGridFilter} from "ag-grid-react";
// global vars
import {useFilter} from "../Providers/ProviderFilter";
// mui components
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
// styling
import '../Filters/FilterCheckboxSet.css'
import {DoesFilterPassParams} from "ag-grid-community";

export default function FilterCheckboxSet ({model, onModelChange, getValue, colDef}: CustomFilterProps) {

    const { retrieveColSet } = useFilter();
    const [set] = useState<string[] | null>(retrieveColSet(colDef?.field))
    const [map, setMap] = useState(new Map<string, boolean>());

    // initialize map
    useEffect(() => {
        let tempMap = new Map<string, boolean>();
        set?.forEach((v) => {
            tempMap.set(v, true)
        })
        setMap(tempMap);
    }, [])

    const resetMap:() => void = useCallback(():void => {
        setMap(prev => {
            const newMap = new Map(map);
            set?.forEach((v) => {
                newMap.set(v, true)
            })
            return newMap;
        })
    }, [map, set])

    const ifAllTrue = useMemo(():boolean => {
        let state:boolean = true;
        map.forEach((v) => {
            if (!v) state = false;
        })
        return state;
    }, [map])

    const ifEnabled = useCallback((e:any) => {
        console.log(e);
    }, [map])

    const modifyMap = useCallback((key:string):void => {
        //
        if(!map.has(key)) return;
        //
        setMap(prev => {
            const newMap = new Map(prev);
            newMap.set(key, !newMap.get(key));
            return newMap;
        })
    }, [map])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)=> {
        if(e.target.id === "all")
            resetMap();
        else
            modifyMap(e.target.id);
    }, [modifyMap, resetMap])


    useEffect(() => {
        console.log(map)
    }, [map])

    return (
        <div className="FormContainer">
            <FormGroup className="FormGroupContainer">
                <FormControlLabel
                    control={
                        <Checkbox
                            id="all"
                            size="small"
                            onChange={handleChange}
                            checked={ifAllTrue}
                        />
                    }
                    label="All"
                />
                {set && set.map((att:string) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                id={att}
                                size="small"
                                onChange={handleChange}
                            />
                        }
                        label={att}
                    />
                ))}
            </FormGroup>
                <Button className="ButtonSpacing"
                 variant="outlined"
                >Reset</Button>
        </div>
    )
}