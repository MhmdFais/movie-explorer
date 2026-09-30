import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
});

const NO_POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="342" height="513"><rect width="100%" height="100%" fill="#888"/><text x="50%" y="50%" fill="#fff" font-size="24" text-anchor="middle">No poster</text></svg>',
  );

export const posterUrl = (path, size = "w342") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : NO_POSTER;

export const getTrending = (page = 1) =>
  api.get("/trending/movie/week", { params: { page } }).then((r) => r.data);

export const searchMovies = (query, page = 1) =>
  api.get("/search/movie", { params: { query, page } }).then((r) => r.data);

// append_to_response gets cast + videos in one request instead of three
export const getMovie = (id) =>
  api
    .get(`/movie/${id}`, { params: { append_to_response: "videos,credits" } })
    .then((r) => r.data);

export const getGenres = () =>
  api.get("/genre/movie/list").then((r) => r.data.genres);

// Turns raw axios errors into messages
export const getErrorMessage = (err) => {
  if (!err.response)
    return "Network problem. Check your connection and try again.";
  const s = err.response.status;
  if (s === 401) return "Invalid TMDb API key. Check your .env file.";
  if (s === 404) return "We could not find that movie.";
  if (s === 429) return "Too many requests. Please wait a moment.";
  return "Something went wrong. Please try again.";
};
