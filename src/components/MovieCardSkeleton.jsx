import React from "react";

const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-[#1c1c24] rounded-lg overflow-hidden shadow-md">
      {/* Poster placeholder */}
      <div className="w-full aspect-[3/4] bg-gray-700"></div>

      {/* Text placeholders */}
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
