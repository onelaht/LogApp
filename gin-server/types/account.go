package types

type Account struct {
	AccName string              `json:"accName"`
	RowData []map[string]string `json:"rowData"`
	ColDefs []ColDef            `json:"colDefs"`
	TagDefs []ColDef            `json:"tagDefs"`
}
