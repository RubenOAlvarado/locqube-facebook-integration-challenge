package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/RubenOAlvarado/locqube-facebook-integration-challenge/backend/config"
	"github.com/RubenOAlvarado/locqube-facebook-integration-challenge/backend/models"
	"github.com/gin-gonic/gin"
)

func FacebookLoginHandler(c *gin.Context) {
	clientID := config.FacebookOAuthConfig.ClientID
	redirectURI := config.FacebookOAuthConfig.RedirectURL
	scopes := strings.Join(config.FacebookOAuthConfig.Scopes, ",")

	if clientID == "" || redirectURI == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Facebook OAuth configuration is missing"})
		return
	}

	url := fmt.Sprintf("https://www.facebook.com/v3.2/dialog/oauth?client_id=%s&redirect_uri=%s&response_type=code&scope=%s&state=random-state",
		clientID, redirectURI, scopes)

	c.Redirect(http.StatusTemporaryRedirect, url)
}

func FacebookCallbackHandler(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing authorization code"})
		return
	}

	token, err := config.FacebookOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to exchange authorization code"})
		return
	}

	userInfo, err := fetchUserInfo(token.AccessToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user info"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user":  userInfo,
		"token": token.AccessToken,
	})
}

func fetchUserInfo(accessToken string) (*models.FacebookUser, error) {
	req, _ := http.NewRequest("GET", "https://graph.facebook.com/me?fields=id,name,email", nil)
	req.Header.Set("Authorization", "Bearer "+accessToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	var user models.FacebookUser
	err = json.NewDecoder(resp.Body).Decode(&user)
	return &user, err
}
