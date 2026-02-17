package bands

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/db"
	"github.com/lukegrn/harmonics/api/db/models"
)

func List(c *gin.Context) {
	var bands []models.Band

	search := c.Query("name")

	db, err := db.DB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	err = db.Model(models.Band{}).
		Preload("Genres").
		Where("name LIKE ?", "%"+search+"%").
		Find(&bands).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	c.JSON(http.StatusOK, bands)
}
