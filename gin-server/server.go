package main

import (
	"example/gin-server/userdata"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DataReceived struct {
	UserData string `json:"userData"`
}

func handleUpload(c *gin.Context) {
	var data DataReceived
	if err := c.BindJSON(&data); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": userdata.ManageData(data.UserData)})
}

func main() {
	router := gin.Default()
	router.POST("/upload", handleUpload)
	err := router.Run(":5000")
	if err != nil {
		return
	}
}
