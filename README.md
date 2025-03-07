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

## Database Design 

| Table Name         | Primary Key | Foreign Keys                          | Relationship Type                                                                 |
|--------------------|-------------|---------------------------------------|-----------------------------------------------------------------------------------|
| users              | id          | -                                     | A user can have multiple reviews, watchlists, wishlists, and curated lists.       |
| movies             | id          | -                                     | A movie can have multiple reviews and appear in multiple lists.                   |
| reviews            | id          | userId → users.id, movieId → movies.id | One-to-Many: A user can write multiple reviews, and each review belongs to a movie.|
| watchlist          | id          | userId → users.id, movieId → movies.id | Many-to-Many: A user can add multiple movies to their watchlist, and a movie can be in multiple users' watchlists. |
| wishlist           | id          | userId → users.id, movieId → movies.id | Many-to-Many: A user can add multiple movies to their wishlist, and a movie can be in multiple users' wishlists. |
| curated_list       | id          | userId → users.id                     | One-to-Many: A user can create multiple curated lists.                            |
| curated_list_item  | id          | curatedListId → curated_list.id, movieId → movies.id | Many-to-Many: A curated list can have multiple movies, and a movie can be in multiple curated lists. |


<img align="right"  alt="Coding"  width="600" src="https://github.com/chauhan-akshay123/Movie-Matrix/blob/main/Movie_matri_DB.png">


