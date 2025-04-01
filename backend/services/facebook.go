package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/RubenOAlvarado/locqube-facebook-integration-challenge/backend/models"
)

var UserTokens = make(map[string]string)

func PostToFacebook(accessToken string, property *models.Property, isVideo bool) error {
	url := "https://graph.facebook.com/me/feed"
	var message string
	var link string

	if isVideo {
		message = formatVideoPost(property)
		link = property.VideoURL
	} else {
		message = formatImagePost(property)
		link = property.ListingURL
	}

	payload := map[string]string{
		"message":      message,
		"access_token": accessToken,
		"link":         link,
	}

	jsonPayload, _ := json.Marshal(payload)
	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var fbError map[string]interface{}
		json.NewDecoder(resp.Body).Decode(&fbError)
		return fmt.Errorf("facebook API error: %v", fbError)
	}

	return nil
}

func formatImagePost(property *models.Property) string {
	return fmt.Sprintf(`🏡 JUST LISTED! 🏡
📍 %s 📍
Location: %s, %s, %s %s
💰 Price: $%s

📝 %s
📸 Take a look at this amazing home! Click here for more details:
%s
#RealEstate #ForSale #DreamHome #LocqubeListings`,
		property.Title,
		property.Address.Street, property.Address.City, property.Address.State, property.Address.Zip,
		formatPrice(property.Price),
		property.Description,
		property.ListingURL)
}

func formatVideoPost(property *models.Property) string {
	return fmt.Sprintf(`🎥 VIRTUAL TOUR ALERT! 🎥
🏠 %s 📍 
Location: %s, %s, %s %s 
💰 Price: $%s

🚶 Take a tour of this stunning property! Watch now:
%s
#VirtualTour #RealEstate #ForSale #HomeSweetHome #LocqubeListings`,
		property.Title,
		property.Address.Street, property.Address.City, property.Address.State, property.Address.Zip,
		formatPrice(property.Price),
		property.VideoURL)
}

func formatPrice(price float64) string {
	if price >= 1000000 {
		return fmt.Sprintf("%.2fM", price/1000000)
	}
	return fmt.Sprintf("%d", int(price))
}
