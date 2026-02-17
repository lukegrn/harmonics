package db

import (
	"github.com/lukegrn/harmonics/api/db/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var inst *gorm.DB

func Setup() (err error) {
	db, err := DB()
	if err != nil {
		return err
	}

	err = db.AutoMigrate(&models.Band{},
		&models.Genre{})

	return err
}

func DB() (db *gorm.DB, err error) {
	if inst != nil {
		return inst, nil
	} else {
		var err error
		inst, err = gorm.Open(sqlite.Open("harmonics.db"), &gorm.Config{})
		return inst, err
	}
}
