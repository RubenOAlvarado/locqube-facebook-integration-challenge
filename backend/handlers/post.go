package handlers

import (
	"net/http"

	"github.com/RubenOAlvarado/locqube-facebook-integration-challenge/backend/services"
	"github.com/gin-gonic/gin"
)

func FacebookPostHandler(c *gin.Context) {
	var postRequest struct {
		AccessToken string `json:"accessToken"`
		PropertyID  string `json:"propertyId"`
		IsVideo     bool   `json:"isVideo"`
	}

	if err := c.ShouldBindJSON(&postRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	property, err := services.GetProperty(postRequest.PropertyID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid property ID"})
		return
	}

	err = services.PostToFacebook(postRequest.AccessToken, property, postRequest.IsVideo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to post to Facebook: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Post successful",
		"post": map[string]interface{}{
			"propertyId": property.PropertyID,
			"title":      property.Title,
			"type": func() string {
				if postRequest.IsVideo {
					return "video"
				}
				return "image"
			}(),
		},
	})
}
