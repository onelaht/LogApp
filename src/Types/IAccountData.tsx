import {Row} from "./Row";
import {ColDef} from "ag-grid-community";

export interface IAccountData {
    RowData: Row[],
    ColDefs: ColDef[],
    TagDefs: ColDef[],
}