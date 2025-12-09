package types

type ColDef struct {
	CellDataType string              `json:"cellDataType"`
	Field        string              `json:"field"`
	Filter       string              `json:"filter"`
	FilterParams map[string][]string `json:"filterParams"`
}
