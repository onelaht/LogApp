package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func testing(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "hello",
	})
}

func main() {
	router := gin.Default()
	router.GET("/test", testing)
	router.Run(":5000")
}
