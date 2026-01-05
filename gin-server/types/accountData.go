package types

type AccountData struct {
	RowData []map[string]string `json:"rowData"`
	ColDefs []ColDef            `json:"colDefs"`
	TagDefs []ColDef            `json:"tagDefs"`
}
