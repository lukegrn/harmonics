package models

import "gorm.io/gorm"

type Recommendation struct {
	gorm.Model
	BandName     string   `json:"-"`
	CategoryName string   `json:"-"`
	Band         Band     `gorm:"foreignKey:BandName;references:Name" json:"band"`
	Category     Category `gorm:"foreignKey:CategoryName;references:Name" json:"category"`
}
