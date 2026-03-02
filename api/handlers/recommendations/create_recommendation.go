package recommendations

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/db"
	"github.com/lukegrn/harmonics/api/db/models"
)

type CreateRecommendationRequest struct {
	A            string `json:"a" binding:"required"`
	B            string `json:"b" binding:"required"`
	CategoryName string `json:"category" binding:"required"`
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
	var category = models.Category{Name: rec.CategoryName}

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
	a.Recommendations = append(a.Recommendations, models.Recommendation{Band: b, Category: category})
	b.Recommendations = append(b.Recommendations, models.Recommendation{Band: a, Category: category})

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
