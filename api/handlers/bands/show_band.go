package bands

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/db"
	"github.com/lukegrn/harmonics/api/db/models"
	"gorm.io/gorm"
)

func Show(c *gin.Context) {
	var b models.Band

	db, err := db.DB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	b.Name = c.Param("name")

	err = db.Model(models.Band{}).
		Preload("Genres").
		Preload("Recommendations").
		First(&b).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{})
			return
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
			return
		}
	}

	c.JSON(http.StatusOK, b)
}
