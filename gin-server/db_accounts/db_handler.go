package db_accounts

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/jackc/pgx/v5"

	"example/gin-server/db"

	"example/gin-server/types"
)

func NewAccount(acc types.Account) error {
	ctx := context.Background()
	fmt.Println("here")
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
