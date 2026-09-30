# 🎬 Movie Explorer

A movie discovery web app built with React and the TMDb API. Search for movies, browse what's trending, view details, and save your favorites.

**Live demo:** https://movie-explorer-eosin-delta.vercel.app
**Demo login:** `admin` / `movie123`

## Features

- Login page with protected routes (mocked authentication)
- Search bar with debounce, so the API isn't called on every keystroke
- Responsive grid of movie posters showing title, release year and rating
- Movie details page with overview, genres, cast, runtime, rating and a trailer link
- Trending movies section with a "Load More" button
- Infinite scrolling for search results
- Light/dark mode that remembers your choice
- Favorites list saved in local storage
- Last searched movie saved in local storage and restored on reload
- Friendly error messages for API failures (bad key, network problems, rate limits, not found)
- Mobile-first responsive layout

**Bonus features**

- Filter by genre, year and rating
- Embedded YouTube trailer in a dialog
- "Load More" button on trending movies

## Tech stack

- React (Create React App)
- Material-UI (MUI) for styling
- React Router for navigation
- Axios for API requests
- React Context API for state management
- TMDb API

## Getting started

1. Clone the repo and install dependencies:

```bash
   git clone https://gitlab.com/YOUR-USERNAME/loons-lab-movie-explorer.git
   cd loons-lab-movie-explorer
   npm install
```

2. Get a free API key from [TMDb](https://www.themoviedb.org/settings/api) (use the **v3 API key**).
3. Copy the example env file and add your key:

```bash
   cp .env.example .env
```

```
   REACT_APP_TMDB_API_KEY=your_key_here
```

4. Start the app:

```bash
   npm start
```

It runs at http://localhost:3000. Restart the server if you change `.env`.

To create a production build, run `npm run build`.

## API usage

All requests go through `src/api/tmdb.js`, which uses a single Axios instance with the API key attached.

| Feature                          | Endpoint                                            |
| -------------------------------- | --------------------------------------------------- |
| Trending movies                  | `GET /trending/movie/week`                          |
| Search                           | `GET /search/movie`                                 |
| Movie details, cast and trailers | `GET /movie/{id}?append_to_response=videos,credits` |
| Genre list (filters)             | `GET /genre/movie/list`                             |

`append_to_response` fetches details, cast and videos in a single request instead of three. Errors are converted into user-friendly messages by `getErrorMessage`.

## Project structure

```
src/
├── api/          TMDb client and error helper
├── components/   Reusable UI (Navbar, MovieCard, MovieGrid, SearchBar, FilterBar, FavoriteButton, ProtectedRoute)
├── context/      AuthContext, ColorModeContext, MovieContext
├── hooks/        useInfiniteScroll
└── pages/        Login, Home, MovieDetails, Favorites
```

## Design decisions

- **Context API instead of Redux.** The shared state (movies, search, favorites) is small, so Context keeps things simple with no extra dependencies.
- **Debounced search.** The search waits 500ms after typing stops, which avoids unnecessary API calls.
- **Request ordering.** Each search gets an id, and responses from outdated searches are ignored, so slow responses can't overwrite newer results.
- **Infinite scroll with IntersectionObserver.** It is more efficient than listening to scroll events.
- **Local storage.** It is used for the theme, login session, last search and favorites. Favorites store only the fields needed to render a card.
- **Mocked login.** The brief has no backend, so credentials are checked on the client. In a real app this would be a server-side flow with tokens.
- **Client-side filters.** Filters apply to the results already loaded. A server-side version would use TMDb's `/discover/movie` endpoint.

## Possible improvements

- Real authentication with a backend
- Server-side filtering using `/discover/movie`
- Unit tests for the context and API helpers
- Migrate from Create React App to Vite

## Deployment

Deployed on Vercel. The `REACT_APP_TMDB_API_KEY` environment variable is set in the Vercel project settings, and `vercel.json` rewrites all routes to `index.html` so page refreshes work with React Router.

Note: Create React App bundles environment variables into the client code, so the TMDb key is visible in the browser. This is acceptable for a free read-only TMDb key, but a production app would proxy requests through a backend.
