export const Layout1 = {
    global: {},
    borders: [
        {
            type: "border",
            location: "left" as const,
            children: [
                {
                    type: "tab",
                    name: "test",
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
                        name: "One",
                        component: "Placeholder",
                    }
                ]
            }
        ]
    }
}