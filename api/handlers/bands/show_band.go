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

	err = db.Debug().Model(models.Band{}).
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

	err = db.Model(&b).Association("Genres").Find(&b.Genres)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	err = db.Model(&b).Association("Recommendations").Find(&b.Recommendations)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	for i := range b.Recommendations {
		err = db.Debug().Model(&b.Recommendations[i]).
			Association("Band").
			Find(&b.Recommendations[i].Band)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
			return
		}

		err = db.Debug().Model(&b.Recommendations[i]).
			Association("Category").
			Find(&b.Recommendations[i].Category)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
			return
		}

		err = db.Model(&b.Recommendations[i].Band).
			Association("Genres").
			Find(&b.Recommendations[i].Band.Genres)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
			return
		}
	}

	c.JSON(http.StatusOK, b)
}
