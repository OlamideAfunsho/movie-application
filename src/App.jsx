import React, { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');


  // Debounce the search term to prevent making too many API requests by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);


  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Falied to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0])
      }

      
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movie. Please try again later');
    } finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async() => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);
  

  return (
    <main>
      <div className='pattern' />
 
      <div className='wrapper background-color-gradient flex flex-col ' >
        <header className='flex flex-col items-center'>
          <img src='/logo.png' className='w-28 h-28' />
          <img src='/hero-banner.png' className='hero-banner shadow-lg w-[300px] h-[300px] sm:w-[450px] sm:h-[350px]' />
          <h1 className='text-3xl sm:text-4xl max-w-md text-center font-bold'>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
        <section className="grid place-content-evenly sm:p-16">
          <h2 className='mt-4 sm:mt-0 mb-6 text-xl font-bold'>Trending Movies</h2>

          <ul className='grid grid-cols-2 place-content-around gap-4 sm:flex justify-between'>
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id} className='flex mr-4 mb-2'>
                <p className='text-2xl mr-2 sm:text-9xl'>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} className='w-24 h-32 rounded-sm' />
              </li>
            ))}
          </ul>
        </section>
      )}
      </div>

      
      
        <section className='all-movies p-16 bg-[#020314]'>
          <h2 className='text-2xl font-bold mb-8'>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ): errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ): (
            <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
    </main>
  )
}

export default App
