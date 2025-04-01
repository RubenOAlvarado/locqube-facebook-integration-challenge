# Facebook Integration Challenge

## Setup

1. Clone the repo
2. Config env variables (check `.env.example`)
3. Run backend: `cd backend && go run main.go`
4. Run frontend: `cd frontend && npm start`

## Endpoints

- `GET /auth/facebook/login` - Redirects to Facebook login page
- `GET /auth/facebook/callback` - Callback de Facebook
- `POST /api/post/facebook` - Publish posts to a facebook profile
- `GET /api/properties` - Retrieves all mocked properties
- `GET /api/properties/:id` - Retrieve a property by id`

## Highlights

- Tokens are stored in memory for the assesment proposes
- Frontend runs in 5173 PORT, while backend in 8080