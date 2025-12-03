package main

import (
	"example/gin-server/userdata"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type rawFile struct {
	UserData string `json:"userData"`
}

type colDef struct {
	CellDataType string              `json:"cellDataType"`
	Field        string              `json:"field"`
	Filter       string              `json:"filter"`
	FilterParams map[string][]string `json:"filterParams"`
}
type account struct {
	AccName string              `json:"accName"`
	RowData []map[string]string `json:"rowData"`
	ColDefs []colDef            `json:"colDefs"`
	TagDefs []colDef            `json:"tagDefs"`
}

// rawUpload
// converts raw user data (TXT) to array of tuples
// - returns 2D array of user data
// - returns nil if raw user data is empty
// - returns error message if any error occurs
func rawUpload(c *gin.Context) {
	var data rawFile
	// prompt if error occurs
	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	relation, uSymbol, uAccount := userdata.ManageData(data.UserData)
	c.JSON(http.StatusOK, gin.H{
		"data":     relation,
		"uSymbol":  uSymbol,
		"uAccount": uAccount,
	})
}

func saveNewAccount(c *gin.Context) {
	var data account
	// prompt if error occurs
	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(data.AccName)
}

// contains endpoint initialization and handlers
func main() {
	// initialize gin
	router := gin.Default()
	// upload endpoint handler
	router.POST("/upload", rawUpload)
	router.POST("/saveNewAccount", saveNewAccount)
	// run via localhost:5000
	err := router.Run(":5000")
	// exit if any error occurs
	if err != nil {
		return
	}
}
