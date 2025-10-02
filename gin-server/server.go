package main

import (
	"example/gin-server/userdata"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DataReceived struct {
	UserData string `json:"userData"`
}

// handleUpload
// converts raw user data (TXT) to array of tuples
// - returns 2D array of user data
// - returns nil if raw user data is empty
// - returns error message if any error occurs
func handleUpload(c *gin.Context) {
	var data DataReceived
	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": userdata.ManageData(data.UserData)})
}

// contains endpoint initialization and handlers
func main() {
	// initialize gin
	router := gin.Default()
	// upload endpoint handler
	router.POST("/upload", handleUpload)
	// run via localhost:5000
	err := router.Run(":5000")
	// exit if any error occurs
	if err != nil {
		return
	}
}
