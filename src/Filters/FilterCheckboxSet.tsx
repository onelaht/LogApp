// react
import React, {useCallback, useEffect, useMemo, useState} from 'react';
// ag grid
import {CustomFilterProps, useGridFilter} from "ag-grid-react";
import {DoesFilterPassParams} from "ag-grid-community";
// global vars
import {useFilter} from "../Providers/ProviderFilter";
// mui components
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
// styling
import '../Filters/FilterCheckboxSet.css'

export default function FilterCheckboxSet ({onModelChange, colDef}: CustomFilterProps) {

    const { retrieveColSet } = useFilter();
    const [map, setMap] = useState(new Map<string, boolean>());

    // initialize map
    useEffect(() => {
        const tempMap = new Map<string, boolean>();
        retrieveColSet(colDef?.field)?.forEach((v) => {
            tempMap.set(v, true)
        })
        setMap(tempMap);
    }, [])

    const ifTrue = useCallback((key:string):boolean => {
        return !!(map.get(key));
    }, [map])

    const ifAllTrue = useMemo(():boolean => {
        let status = true;
        map.forEach((v:boolean) => {
            if (!v) status = false;
        })
        return status;
    }, [map])

    const modifyKey = useCallback((key:string):void => {
        if(!map.has(key)) return;
        setMap(prev => {
            const newMap = new Map(prev);
            newMap.set(key, !newMap.get(key));
            return newMap;
        })
    }, [map])

    const modifyAllKeys = useCallback((state: boolean):void => {
        setMap(prev => {
            const newMap = new Map(prev);
            Array.from(newMap.keys()).forEach((key) => {
                newMap.set(key, state);
            })
            return newMap;
        })
    }, [])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.id === "all")
            e.target.checked ? modifyAllKeys(true) : modifyAllKeys(false);
        else
            modifyKey(e.target.id);
        onModelChange(e.target.id ? map : null);
    }, [modifyAllKeys, modifyKey, onModelChange, map])

    const doesFilterPass = useCallback(({data, node}:DoesFilterPassParams) => {
        return ifTrue(data?.[colDef.field as string])
    }, [colDef, ifTrue])

    useGridFilter({doesFilterPass});

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
                {map.size >= 1 && (Array.from(map.keys())).map((att:string) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                id={att}
                                size="small"
                                onChange={handleChange}
                                checked={ifTrue(att)}
                            />
                        }
                        label={att}
                    />
                ))}
            </FormGroup>
        </div>
    )
}