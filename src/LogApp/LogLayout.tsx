// react
import {useCallback, useRef} from "react";
// flex-layout
import {Layout, Model} from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import {Layout1} from './Layouts/Layout1';
// split component
import LogTable from "./LogTable"

export default function LogLayout() {
    const layoutRef = useRef<Layout | null>(null);
    const model = Model.fromJson(Layout1)

    const factory = useCallback((node:any) => {
        const component = node.getComponent();
        switch(component) {
            case "Placeholder": return <div>{node.getName()}</div>
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