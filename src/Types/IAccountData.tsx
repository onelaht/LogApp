import {Row} from "./Row";
import {ColDef} from "ag-grid-community";

export interface IAccountData {
    rowData: Row[],
    colDefs: ColDef[],
    tagDefs: ColDef[],
}