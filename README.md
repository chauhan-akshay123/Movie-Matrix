# Movie Matrix

## Project Overview

Movie Matrix is a movie curation and management platform that allows users to organize their watchlists, wishlists, and curated movie collections. Users can search, filter, and sort movies based on genres, actors, ratings, and release years. Additionally, the platform enables users to add detailed reviews and fetch the top-rated movies along with review analysis.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (with Sequelize ORM)
- **Authentication:** JWT (not implemented yet)
- **Libraries Used:**
  - `express` - Web framework for Node.js
  - `sequelize` - ORM for database management
  - `sqlite3` - Database engine
  - `dotenv` - Environment variable management
  - `axios` - HTTP requests (for fetching external data)

## Features

- Movie management (CRUD operations for movies)
- Search movies by genre and actors
- Sorting movies by rating or release year
- Fetch top 5 highest-rated movies with detailed reviews
- Review management with word count analysis

## API Endpoints

### 1. Get All Movies

**Endpoint:** `GET /api/movies`
**Description:** Fetches all movies from the database.
**Response:**

```json
{
    "movies": [
        {
            "title": "Inception",
            "genre": "Action, Sci-Fi",
            "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt",
            "releaseYear": 2010,
            "rating": 8.8
        }
    ]
}
```

### 2. Search Movies by Genre and Actor

**Endpoint:** `GET /api/movies/search`
**Query Parameters:**

- `genre` (optional)
- `actor` (optional)
  **Example Request:**

```
GET /api/movies/search?genre=Action&actor=Leonardo%20DiCaprio
```

**Response:**

```json
{
    "movies": []
}
```

### 3. Sort Movies

**Endpoint:** `GET /api/movies/sort`
**Query Parameters:**

- `list` (watchlist, wishlist, curatedlist)
- `sortBy` (rating, releaseYear)
- `order` (ASC, DESC)
  **Example Request:**

```
GET /api/movies/sort?list=watchlist&sortBy=rating&order=ASC
```

### 4. Get Top 5 Movies by Rating with Reviews

**Endpoint:** `GET /api/movies/top5`
**Response:**

```json
{
    "movies": [
        {
            "title": "Inception",
            "rating": 8.8,
            "review": {
                "text": "Great movie with a brilliant plot.",
                "wordCount": 6
            }
        }
    ]
}
```

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/yourusername/Movie-Matrix.git
cd Movie-Matrix
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up Database

- Create an `.env` file with the following:

```
DATABASE_URL=sqlite:./database.sqlite
```

- Run migrations and seed data:

```
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 4. Start the Server

```
npm start
```

### 5. API Testing

Use Postman or cURL to test API endpoints.


