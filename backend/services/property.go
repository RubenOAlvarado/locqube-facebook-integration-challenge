package services

import (
	"encoding/json"
	"errors"
	"io"
	"os"

	"github.com/RubenOAlvarado/locqube-facebook-integration-challenge/backend/models"
)

var propertyResponse models.PropertyResponse

func LoadMockProperties() error {
	jsonFile, err := os.Open("data/property-listing.json")
	if err != nil {
		return err
	}
	defer jsonFile.Close()

	byteValue, _ := io.ReadAll(jsonFile)
	json.Unmarshal(byteValue, &propertyResponse)
	return nil
}

func GetProperty(id string) (*models.Property, error) {
	for _, property := range propertyResponse.Properties {
		if property.PropertyID == id {
			return &property, nil
		}
	}

	return nil, errors.New("Property not found")
}

func GetProperties() []models.Property {
	return propertyResponse.Properties
}
