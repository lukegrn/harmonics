package models

import (
	"gorm.io/gorm"
)

type Band struct {
	gorm.Model
	Name   string  `json:"name" binding:"required"`
	Genres []Genre `gorm:"many2many:band_genres;" json:"genres"`
}
