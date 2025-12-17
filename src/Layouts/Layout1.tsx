export const Layout1 = {
    global: {},
    borders: [
        {
            type: "border",
            location: "left" as const,
            children: [
                {
                    type: "tab",
                    name: "Column Visibility",
                    component: "ColumnVisibility",
                    borderWidth: 250,
                },
                {
                    type: "tab",
                    name: "Manage Tags",
                    component: "Tags",
                    borderWidth: 350,
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