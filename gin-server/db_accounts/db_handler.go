package db_accounts

import (
	"context"
	"encoding/json"

	"github.com/jackc/pgx/v5"

	"example/gin-server/db"

	"example/gin-server/types"
)

func NewAccount(acc types.Account) error {
	ctx := context.Background()
	// connect to tdb
	conn, err := pgx.Connect(ctx, "postgres://user1:pass@localhost:5432/db1_proj1?sslmode=disable")
	if err != nil {
		return err
	}
	defer conn.Close(ctx)

	queries := db.New(conn)

	// jsonify map
	coldefJson, _ := json.Marshal(acc.ColDefs)
	tagdefsJson, _ := json.Marshal(acc.TagDefs)
	rowdataJson, _ := json.Marshal(acc.RowData)

	// create account
	_, err = queries.CreateAccount(ctx, db.CreateAccountParams{
		Name:    acc.AccName,
		Coldefs: coldefJson,
		Tagdefs: tagdefsJson,
		Rowdata: rowdataJson,
	})
	if err != nil {
		return err
	}
	return nil
}

func GetAllAccount() []types.Account {
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, "postgres://user1:pass@localhost:5432/db1_proj1?sslmode=disable")
	if err != nil {
		return nil
	}
	defer conn.Close(ctx)
	queries := db.New(conn)

	table, err := queries.GetAllAccounts(ctx)
	if err != nil {
		return nil
	}

	var accounts []types.Account
	for _, value := range table {
		var account types.Account
		account.AccName = value.Name
		err := json.Unmarshal(value.Coldefs, &account.ColDefs)
		if err != nil {
			continue
		}
		err = json.Unmarshal(value.Tagdefs, &account.TagDefs)
		if err != nil {
			continue
		}
		err = json.Unmarshal(value.Rowdata, &account.RowData)
		if err != nil {
			continue
		}
		accounts = append(accounts, account)
	}
	return accounts
}
