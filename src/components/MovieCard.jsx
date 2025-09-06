import React from 'react'

const MovieCard = ({movie:{title, vote_average, poster_path, release_date, original_language}}) => {
  return (
    <div className='bg-[#05072e] p-5 rounded-2xl shadow-inner shadow-light-100/10'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} className='rounded-xl' />

        <div className='mt-4'>
            <h3>{title}</h3>
            <div className='content'>
                <div className="rating flex flex-row">
                    <img src="star.png" alt="Star Icon" />
                    <p className='pl-1 pr-1'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    <span>•</span>
                    <p className="lang pl-1 pr-1 ">{original_language}</p>
                    <span>•</span>
                    <p className='year pl-1'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default MovieCard