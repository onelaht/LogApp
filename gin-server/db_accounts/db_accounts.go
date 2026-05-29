package db_accounts

import (
	"context"
	"encoding/json"
	"example/gin-server/db"
	"example/gin-server/types"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

func formatSierraChartData(accID int32, data map[string]string) db.CreateSierraDataParams {
	// set account id
	postgresInt := pgtype.Int4{
		Int32: accID,
		Valid: true,
	}
	sierraChartData := db.CreateSierraDataParams{
		AccountID: postgresInt,
	}
	_ = sierraChartData.AccountID.Scan(postgresInt)
	// set other sierra chart attributes
	for key := range data {
		switch key {
		case "Symbol":
			_ = sierraChartData.Symbol.Scan(data[key])
			break
		case "Entry DateTime":
			_ = sierraChartData.EntryDatetime.Scan(data[key])
			break
		case "Trade Type":
			_ = sierraChartData.TradeType.Scan(data[key])
			break
		case "Duration":
			_ = sierraChartData.Duration.Scan(data[key])
			break
		case "Profit/Loss (C)":
			_ = sierraChartData.ProfitLoss.Scan(data[key])
			break
		case "Max Open Profit (C)":
			_ = sierraChartData.MaxOpenProfit.Scan(data[key])
			break
		case "Max Open Loss (C)":
			_ = sierraChartData.MaxOpenLoss.Scan(data[key])
			break
		case "Exit DateTime":
			_ = sierraChartData.ExitDatetime.Scan(data[key])
			break
		case "Commission (C)":
			_ = sierraChartData.Commission.Scan(data[key])
			break
		case "Max Open Quantity":
			_ = sierraChartData.MaxOpenQuantity.Scan(data[key])
			break
		case "Trade Quantity":
			_ = sierraChartData.TradeQuantity.Scan(data[key])
			break
		case "Entry Price":
			_ = sierraChartData.EntryPrice.Scan(data[key])
			break
		case "Exit Price":
			_ = sierraChartData.ExitPrice.Scan(data[key])
			break
		case "Max Closed Quantity":
			_ = sierraChartData.MaxClosedQuantity.Scan(data[key])
			break
		case "FlatToFlat Profit/Loss (C)":
			_ = sierraChartData.FlatToFlatProfitLoss.Scan(data[key])
			break
		case "FlatToFlat Max Open Loss (C)":
			_ = sierraChartData.FlatToFlatMaxOpenLoss.Scan(data[key])
			break
		case "FlatToFlat Max Open Profit (C)":
			_ = sierraChartData.FlatToFlatMaxOpenProfit.Scan(data[key])
			break
		case "Entry Efficiency":
			_ = sierraChartData.EntryEfficiency.Scan(data[key])
			break
			//case "Exit Efficiency":
			//	_ = sierraChartData.Ex.Scan(data[key])
			break
		case "Total Efficiency":
			_ = sierraChartData.TotalEfficiency.Scan(data[key])
			break
		case "High Price While Open":
			_ = sierraChartData.HighPriceWhileOpen.Scan(data[key])
			break
		case "Low Price While Open":
			_ = sierraChartData.LowPriceWhileOpen.Scan(data[key])
			break
		case "Note":
			_ = sierraChartData.Note.Scan(data[key])
			break
		case "Open Position Quantity":
			_ = sierraChartData.OpenPositionQuantity.Scan(data[key])
			break
		case "Close Position Quantity":
			_ = sierraChartData.ClosePositionQuantity.Scan(data[key])
			break
		}
	}
	return sierraChartData
}

// NewAccount
// insert account data as new tuple
// - returns nil if successful
// - returns err if any errors occurs
func NewAccount(acc types.Account) error {
	// if rowData is empty or dne, ignore
	if acc.RowData == nil || len(acc.RowData) == 0 {
		return nil
	}
	// attributes provided by sierra chart
	sierraSet := map[string]struct{}{
		"Entry DateTime":                 struct{}{},
		"Exit DateTime":                  struct{}{},
		"Duration":                       struct{}{},
		"Symbol":                         struct{}{},
		"Trade Type":                     struct{}{},
		"Entry Price":                    struct{}{},
		"Exit Price":                     struct{}{},
		"Low Price While Open":           struct{}{},
		"High Price While Open":          struct{}{},
		"Profit/Loss (C)":                struct{}{},
		"Max Open Profit (C)":            struct{}{},
		"Max Open Loss (C)":              struct{}{},
		"Commission (C)":                 struct{}{},
		"Trade Quantity":                 struct{}{},
		"Open Position Quantity":         struct{}{},
		"Close Position Quantity":        struct{}{},
		"Max Open Quantity":              struct{}{},
		"Max Closed Quantity":            struct{}{},
		"Entry Efficiency":               struct{}{},
		"Exit Efficiency":                struct{}{},
		"Total Efficiency":               struct{}{},
		"FlatToFlat Profit/Loss (C)":     struct{}{},
		"FlatToFlat Max Open Loss (C)":   struct{}{},
		"FlatToFlat Max Open Profit (C)": struct{}{},
		"Note":                           struct{}{},
	}
	// initialize context
	ctx := context.Background()
	// connect user and db
	conn, err := pgx.Connect(ctx, "postgres://user1:pass@localhost:5432/db1_proj1?sslmode=disable")
	if err != nil {
		return err
	}
	defer conn.Close(ctx)
	// create instance to execute queries
	queries := db.New(conn)
	// initialize db account
	accID, _ := queries.CreateAccount(ctx, pgtype.Text{String: acc.AccName, Valid: true})
	// serialize col def struct and store ag grid config
	colDefsMarshal, _ := json.Marshal(acc.ColDefs)
	colDefConfig := db.CreateColDefConfigParams{
		AccountID:    accID,
		ColDefConfig: colDefsMarshal,
	}
	_, _ = queries.CreateColDefConfig(ctx, colDefConfig)

	// serialize tag def struct and store ag grid config
	tagDefsMarshal, _ := json.Marshal(acc.TagDefs)
	tagDefConfig := db.CreateTagDefConfigParams{
		AccountID:    accID,
		TagDefConfig: tagDefsMarshal,
	}
	_, _ = queries.CreateTagDefConfig(ctx, tagDefConfig)

	// store account attributes per tuple
	var attributes []map[string]map[string]string = nil
	for _, tuple := range acc.RowData {
		splitAtt := map[string]map[string]string{
			"sierra": {},
			"tags":   {},
		}
		// traverse per attribute in tuple
		for j := range tuple {
			// add to sierra chart subset, if part of sierra chart standard att
			if _, ok := sierraSet[j]; ok {
				splitAtt["sierra"][j] = tuple[j]
				// add to user defined tags subset, if not part of sierra chart standard att
			} else {
				splitAtt["tags"][j] = tuple[j]
			}
		}
		attributes = append(attributes, splitAtt)
	}

	// store sierra chart attributes
	for _, v := range attributes {
		scAttributes := formatSierraChartData(accID, v["sierra"])
		_, _ = queries.CreateSierraData(ctx, scAttributes)
	}
	// loop through split attributes arr
	return nil
}

// GetAccount
// retrieves account by name
// - returns account if successful
// - returns nil and err if any errors occurs
func GetAccount(accName string) (*types.Account, error) {
	return nil, nil
}

// GetAccountNames
// retrieves all account name in db
// - returns array of account name if successful
// - returns nil and err if any errors occursG
func GetAccountNames() []string {
	return nil
}
