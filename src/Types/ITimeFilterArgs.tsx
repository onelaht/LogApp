interface ITimeFormat {
    hour: string | null;
    min: string | null;
    sec: string | null;
}

interface TimeFilter {
    userInput: ITimeFormat;
    filter: string;
    intValue: number | null;
}

export interface ITimeFilterArgs {
    first: TimeFilter;
    second: TimeFilter;
}