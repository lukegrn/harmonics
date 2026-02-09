package models

import (
	"gorm.io/gorm"
)

type Genre struct {
	gorm.Model
	Name  string
	Bands []Band `gorm:"many2many:band_genres;"`
}
