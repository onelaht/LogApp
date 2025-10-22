import {ITimeFormat} from "./ITimeFormat";

interface TimeFilter {
    userInput: ITimeFormat;
    filter: string;
}

export interface ITimeFilterArgs {
    first: TimeFilter;
    second: TimeFilter;
}