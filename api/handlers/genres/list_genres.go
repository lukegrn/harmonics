package genres

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/db"
	"github.com/lukegrn/harmonics/api/db/models"
)

func List(c *gin.Context) {
	var genres []models.Genre

	db, err := db.DB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	res := db.Find(&genres)
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	c.JSON(http.StatusOK, genres)
}
