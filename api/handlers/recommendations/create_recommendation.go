package recommendations

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/db"
	"github.com/lukegrn/harmonics/api/db/models"
)

type CreateRecommendationRequest struct {
	A string `json:"a" binding:"required"`
	B string `json:"b" binding:"required"`
}

func Create(c *gin.Context) {
	var rec CreateRecommendationRequest
	err := c.ShouldBind(&rec)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	db, err := db.DB()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	var a = models.Band{Name: rec.A}
	var b = models.Band{Name: rec.B}

	res := db.First(&a)
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, band not found!"})
		return
	}

	res = db.First(&b)
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, band not found!"})
		return
	}

	// Recommendations are bi-directional
	a.Recommendations = append(a.Recommendations, &b)
	b.Recommendations = append(b.Recommendations, &a)

	res = db.Save(&a)

	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	res = db.Save(&b)

	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	c.JSON(http.StatusCreated, a)
}
