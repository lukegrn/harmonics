package models

import (
	"time"

	"gorm.io/gorm"
)

type Genre struct {
	Name      string `gorm:"unique;not null;primaryKey" form:"name" json:"name"`
	Bands     []Band `gorm:"many2many:band_genres;" json:"bands"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
