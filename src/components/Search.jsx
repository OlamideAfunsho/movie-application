import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search m-6 sm-10'>
      <div className='flex items-center bg-[#05072e] border pl-4 gap-2 border-transparent h-[40px] sm:h-[46px] rounded-full overflow-hidden w-[300px] sm:w-md'>
        <img src='search.svg' alt='search' className='w-4' />

        <input
         className="w-full h-full outline-none bg-transparent placeholder-gray-500 text-sm sm:text-base"
         type="text" 
         placeholder='Search through thousands of movies'
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>
    </div>
  )
}

export default Search