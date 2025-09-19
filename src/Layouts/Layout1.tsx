export const Layout1 = {
    global: {},
    borders: [
        {
            type: "border",
            location: "left" as const,
            children: [
                {
                    type: "tab",
                    name: "Test",
                    component: "Placeholder",
                }
            ]
        }
    ],
    layout: {
        type: "row",
        weight: 100,
        children: [
            {
                type: "tabset",
                weight: 100,
                children: [
                    {
                        type: "tab",
                        name: "Table",
                        component: "Table",
                    }
                ]
            }
        ]
    }
}