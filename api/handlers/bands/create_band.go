package bands

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/db"
	"github.com/lukegrn/harmonics/api/db/models"
)

func Create(c *gin.Context) {
	var b models.Band
	err := c.ShouldBind(&b)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	db, err := db.DB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	res := db.Create(&b)
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong"})
		return
	}

	c.JSON(http.StatusCreated, b)
}
