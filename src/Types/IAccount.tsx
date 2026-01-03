import {Row} from "./Row";
import {ColDef} from "ag-grid-community";

export interface IAccount {
    accName: string,
    rowData: Row[],
    colDefs: ColDef[],
    tagDefs: ColDef[],
}