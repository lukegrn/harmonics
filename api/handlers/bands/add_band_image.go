package bands

import (
	"errors"
	"fmt"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/db"
	"github.com/lukegrn/harmonics/api/db/models"
	"gorm.io/gorm"
)

type AddImagePayload struct {
	F *multipart.FileHeader `form:"img" binding:"required"`
}

func AddImage(c *gin.Context) {
	var p AddImagePayload
	var b models.Band
	err := c.ShouldBind(&p)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	b.Name = c.Param("name")
	db, err := db.DB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong!"})
		return
	}

	res := db.Take(&b)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"message": "band not found"})
	}

	err = c.SaveUploadedFile(p.F, "./static/"+b.Name)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong saving file!"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "image created"})
}
