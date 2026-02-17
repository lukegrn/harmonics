package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/handlers/bands"
	"github.com/lukegrn/harmonics/api/handlers/genres"
	"github.com/lukegrn/harmonics/api/handlers/recommendations"
)

func RegisterRoutes(router *gin.Engine) {
	static := router.Group("/static")
	static.Static("/", "./static")

	api := router.Group("/api")

	api.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	bandRoutes := api.Group("/bands")

	bandRoutes.POST("", bands.Create)
	bandRoutes.GET("/", bands.List)
	bandRoutes.GET("/:name", bands.Show)
	bandRoutes.POST("/:name/img", bands.AddImage)

	genreRoutes := api.Group("/genres")
	genreRoutes.GET("/", genres.List)

	recommenationRoutes := api.Group("/recommendations")
	recommenationRoutes.POST("", recommendations.Create)

}
