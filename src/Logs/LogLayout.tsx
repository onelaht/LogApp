// react
import {useCallback, useRef} from "react";
// flex-layout
import {Layout, Model} from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import {Layout1} from '../Layouts/Layout1';
// split component
import LogTable from "./LogTable"
import LogColVisibility from "./LogColVisibility";
import LogTags from "./LogTags";

export default function LogLayout() {
    // reference for flexlayout (used in the future)
    const layoutRef = useRef<Layout | null>(null);

    // flexlayout ui model
    const model = Model.fromJson(Layout1)

    // renders components using specified flexlayout model
    const factory = useCallback((node:any) => {
        // reads in model and retrieves values for "components"
        const component = node.getComponent();
        // render additional components based on value
        switch(component) {
            case "ColumnVisibility": return <LogColVisibility/>
            case "Tags": return <LogTags/>
            case "Table": return <LogTable/>
        }
    }, [])

    return (
        <Layout
            ref={layoutRef}
            model={model}
            factory={factory}/>
    )
}