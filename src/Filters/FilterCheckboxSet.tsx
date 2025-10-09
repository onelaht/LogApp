// react
import React, {useCallback, useEffect, useState} from 'react';
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
    const [set] = useState(retrieveColSet(colDef?.field))
    const [map, setMap] = useState(new Map<string, boolean>());

    // initialize map
    useEffect(() => {
        let tempMap = new Map<string, boolean>();
        set?.forEach((v) => {
            tempMap.set(v, true)
        })
        setMap(tempMap);
    }, [])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)=> {
        if(e.target.id === "all") {

        }
    }, [])

    return (
        <div className="FormContainer">
            <FormGroup className="FormGroupContainer">
                <FormControlLabel
                    control={
                        <Checkbox id="all" size="small" onChange={handleChange}/>
                    }
                    label="All"
                />
                {set && set.map((att:string|null) => (
                    <FormControlLabel
                        control={
                            <Checkbox size="small" onChange={handleChange}/>
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