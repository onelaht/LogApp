// react
import React, {useCallback, useEffect, useState} from 'react';
// ag grid
import {CustomFilterProps} from "ag-grid-react";
// global vars
import {useFilter} from "../Providers/ProviderFilter";
// mui components
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
// styling
import '../Filters/FilterCheckboxSet.css'

export default function FilterCheckboxSet ({model, onModelChange, getValue, colDef}: CustomFilterProps) {

    const { retrieveColSet } = useFilter();
    const [set, setSet] = useState<string[] | null>(null)

    const handleChange = useCallback((e:any) => {
        console.log(e?.target?.checked);
    }, [])

    useEffect(():void => {
        setSet(retrieveColSet(colDef?.field))
    }, [])

    return (
        <div className="FormContainer">
            <FormGroup className="FormGroupContainer">
                <FormControlLabel
                    control={
                        <Checkbox size="small" onChange={handleChange}/>
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