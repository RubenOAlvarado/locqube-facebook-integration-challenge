package handlers

import (
	"net/http"

	"github.com/RubenOAlvarado/locqube-facebook-integration-challenge/backend/services"
	"github.com/gin-gonic/gin"
)

func GetPropertiesHandler(c *gin.Context) {
	properties := services.GetProperties()
	c.JSON(http.StatusOK, properties)
}

func GetPropertyHandler(c *gin.Context) {
	id := c.Param("id")
	property, err := services.GetProperty(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Property not found"})
		return
	}
	c.JSON(http.StatusOK, property)
}
