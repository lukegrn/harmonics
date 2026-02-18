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
	genres := c.QueryArray("genre")

	db, err := db.DB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	query := db.Model(models.Band{}).
		Preload("Genres")

	// Filter based on genres
	if len(genres) > 0 {
		query = query.Joins("inner join band_genres bg on bg.band_name = bands.name").
			Where("bg.genre_name IN ?", genres)
	}

	// Search by band name
	if search != "" {
		query = query.Where("bands.name LIKE ?", "%"+search+"%")
	}

	err = query.Find(&bands).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	c.JSON(http.StatusOK, bands)
}
