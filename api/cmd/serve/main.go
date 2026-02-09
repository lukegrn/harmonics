package main

import (
	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/routes"
)

func main() {
	router := gin.Default()
	routes.RegisterRoutes(router)

	router.Run()
}
