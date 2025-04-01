package routes

import (
	"github.com/RubenOAlvarado/locqube-facebook-integration-challenge/backend/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/auth/facebook/login", handlers.FacebookLoginHandler)
	r.GET("/auth/facebook/callback", handlers.FacebookCallbackHandler)

	r.GET("/properties", handlers.GetPropertiesHandler)
	r.GET("/properties/:id", handlers.GetPropertyHandler)

	r.POST("/post/facebook", handlers.FacebookPostHandler)

}
