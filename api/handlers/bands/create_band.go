package bands

import (
	"fmt"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lukegrn/harmonics/api/db"
	"github.com/lukegrn/harmonics/api/db/models"
)

type BandPayload struct {
	models.Band
	F *multipart.FileHeader `form:"img"`
}

func Create(c *gin.Context) {
	var b BandPayload
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

	if b.F != nil {
		err = c.SaveUploadedFile(b.F, "./static/"+b.Name)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong saving file!"})
			return
		}

	}

	res := db.Create(&b.Band)
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "whoops, something went wrong"})
		return
	}

	c.JSON(http.StatusCreated, b.Band)
}
