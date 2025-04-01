package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

var FacebookOAuthConfig = &oauth2.Config{
	ClientID:     os.Getenv("FACEBOOK_CLIENT_ID"),
	ClientSecret: os.Getenv("FACEBOOK_CLIENT_SECRET"),
	RedirectURL:  os.Getenv("FACEBOOK_REDIRECT_URL"),
	Scopes:       []string{"public_profile", "publish_video", "pages_manage_posts"},
	Endpoint:     facebook.Endpoint,
}
