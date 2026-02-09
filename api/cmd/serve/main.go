package main

import (
	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/db"
	"github.com/lukegrn/harmonics/api/routes"
)

func main() {
	// Setup and connect to db
	err := db.Setup()
	if err != nil {
		panic("Failed to setup DB")
	}

	// Set up routes and run server
	router := gin.Default()
	routes.RegisterRoutes(router)

	router.Run()
}
