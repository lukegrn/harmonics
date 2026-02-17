package models

import (
	"time"

	"gorm.io/gorm"
)

type Band struct {
	Name            string  `json:"name" form:"name" binding:"required" gorm:"unique;not null;primaryKey"`
	Genres          []Genre `gorm:"many2many:band_genres;" json:"genres" form:"genres"`
	Recommendations []*Band `gorm:"many2many:band_recommendations;" json:"recommendations"`
	CreatedAt       time.Time
	UpdatedAt       time.Time
	DeletedAt       gorm.DeletedAt `gorm:"index"`
}
