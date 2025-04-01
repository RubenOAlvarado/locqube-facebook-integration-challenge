package models

type FacebookUser struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type FacebookPostRequest struct {
	AccessToken string `json:"access_token"`
	Message     string `json:"message"`
	Link        string `json:"link"`
	PropertyID  string `json:"propertyId,omitempty"`
}
