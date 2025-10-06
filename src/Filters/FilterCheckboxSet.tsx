import React, {useEffect} from 'react';
import {CustomFilterProps} from "ag-grid-react";

export default function FilterCheckboxSet ({model, onModelChange, getValue, colDef}: CustomFilterProps) {

    useEffect(():void => {
        console.log(model, onModelChange, getValue, colDef);
    }, [])

    return <>Fuck you :)</>
}