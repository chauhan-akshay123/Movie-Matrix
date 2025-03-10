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

#### Response:
```json
{
    "movies": [
        {
            "id": "1",
            "title": "Inception",
            "genre": "Action, Sci-Fi",
            "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt",
            "releaseYear": 2010,
            "rating": 8.8
        }
    ]
}
```

---

### 2. Search Movies by Genre and Actor
**Endpoint:** `GET /api/movies/searchByGenreAndActor`  
**Query Parameters:**  
- `genre` (optional)  
- `actor` (optional)  

#### Example Request:
```
GET /api/movies/searchByGenreAndActor?genre=Action&actor=Leonardo%20DiCaprio
```

#### Response:
```json
{
    "movies": [
        {
            "id": "1",
            "title": "Inception",
            "genre": "Action, Sci-Fi",
            "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt",
            "releaseYear": 2010,
            "rating": 8.8
        }
    ]
}
```

---

### 3. Add a Movie to Watchlist
**Endpoint:** `POST /api/movies/watchlist`  
**Description:** Adds a movie to the user's watchlist.  

#### Request:
```json
{
    "userId": "123",
    "movieId": "1"
}
```

#### Response:
```json
{
    "message": "Movie added to watchlist successfully"
}
```

---

### 4. Add a Movie to Wishlist
**Endpoint:** `POST /api/movies/wishlist`  
**Description:** Adds a movie to the user's wishlist.  

#### Request:
```json
{
    "userId": "123",
    "movieId": "1"
}
```

#### Response:
```json
{
    "message": "Movie added to wishlist successfully"
}
```

---

### 5. Create a Curated List
**Endpoint:** `POST /api/curated-lists`  
**Description:** Creates a new curated movie list.  

#### Request:
```json
{
    "userId": "123",
    "listName": "Best Sci-Fi Movies"
}
```

#### Response:
```json
{
    "message": "Curated list created successfully",
    "curatedListId": "456"
}
```

---

### 6. Update a Curated List
**Endpoint:** `PUT /api/curated-lists/:curatedListId`  
**Description:** Updates the details of an existing curated list.  

#### Request:
```json
{
    "listName": "Updated List Name"
}
```

#### Response:
```json
{
    "message": "Curated list updated successfully"
}
```

---

### 7. Add a Movie to a Curated List
**Endpoint:** `POST /api/movies/curated-list`  
**Description:** Adds a movie to an existing curated list.  

#### Request:
```json
{
    "curatedListId": "456",
    "movieId": "1"
}
```

#### Response:
```json
{
    "message": "Movie added to curated list successfully"
}
```

---

### 8. Add a Review to a Movie
**Endpoint:** `POST /api/movies/:movieId/reviews`  
**Description:** Allows a user to review a movie.  

#### Request:
```json
{
    "userId": "123",
    "reviewText": "Amazing movie with a great plot!",
    "rating": 9.0
}
```

#### Response:
```json
{
    "message": "Review added successfully"
}
```

---

### 9. Sort Movies in a List
**Endpoint:** `GET /api/movies/sort`  
**Query Parameters:**  
- `list` (watchlist, wishlist, curatedlist)  
- `sortBy` (rating, releaseYear)  
- `order` (ASC, DESC)  

#### Example Request:
```
GET /api/movies/sort?list=watchlist&sortBy=rating&order=ASC
```

#### Response:
```json
{
    "movies": [
        {
            "title": "Interstellar",
            "releaseYear": 2014,
            "rating": 8.6
        },
        {
            "title": "Inception",
            "releaseYear": 2010,
            "rating": 8.8
        }
    ]
}
```

---

### 10. Get Top 5 Movies by Rating with Reviews
**Endpoint:** `GET /api/movies/top5`  
**Description:** Fetches the top 5 highest-rated movies along with reviews.  

#### Response:
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
        },
        {
            "title": "The Dark Knight",
            "rating": 9.0,
            "review": {
                "text": "Masterpiece with a legendary performance.",
                "wordCount": 5
            }
        }
    ]
}
```

---

## API Route Mapping

| Route | HTTP Method | Description |
|--------|------------|-------------|
| `/api/movies` | `GET` | Fetch all movies |
| `/api/movies/searchByGenreAndActor` | `GET` | Search movies by genre and actor |
| `/api/movies/watchlist` | `POST` | Add movie to watchlist |
| `/api/movies/wishlist` | `POST` | Add movie to wishlist |
| `/api/curated-lists` | `POST` | Create a curated list |
| `/api/curated-lists/:curatedListId` | `PUT` | Update a curated list |
| `/api/movies/curated-list` | `POST` | Add movie to curated list |
| `/api/movies/:movieId/reviews` | `POST` | Add review to a movie |
| `/api/movies/sort` | `GET` | Sort movies by rating or release year |
| `/api/movies/top5` | `GET` | Fetch top 5 movies with reviews |

---

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


