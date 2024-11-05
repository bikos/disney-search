import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { CharacterCard } from '../components/common/CharacterCard';
import { searchCharacter, getCharacterById } from '@/services/api/disney';
import { FeaturedCharacters } from '@/components/common/FeaturedCharacters';
import { Character } from '@/types/api';
import { DEFAULT_CHARACTER_IDS } from '@/utils/defaultCharacters';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  const {
    data,
    isLoading,
    error,
    isError,
    refetch
  } = useQuery({
    queryKey: ['character', searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        return searchCharacter(searchQuery);
      }
      
      // Fetch all default characters in parallel
      const responses = await Promise.all(
        DEFAULT_CHARACTER_IDS.map((id: number) => getCharacterById(id))
      );
      
      // Transform the responses to match expected format
      return {
        data: responses.map(response => response.data)
      };
    },
    select: (response) => {
      // Ensure we're always returning an array of characters
      return Array.isArray(response.data) ? response.data : [response.data];
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return (
    <main 
      className="container bg-light-blue"
      role="main"
      aria-label="Disney Character Search"
    >
      <section 
        aria-label={searchQuery ? 'Search Results' : 'Featured Characters'}
        className="relative"
      >
        <div className="items-center">
          {searchQuery && (
            <h1 className="text-4xl font-normal pt-10 font-[lato] text-center leading-5">
              Search Results - {searchQuery}
            </h1>
          )}
          
          {isError && (
            <div 
              role="alert"
              className="text-center mt-4"
            >
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                aria-label="Retry loading characters"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div 
            className="grid grid-cols-1 px-4 py-4 sm:px-20 sm:py-20 md:grid-cols-2 lg:grid-cols-4 gap-6"
            role="status"
            aria-busy="true"
            aria-label="Loading characters"
          >
            <p className="sr-only">Loading Disney characters...</p>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="animate-pulse"
                aria-hidden="true"
              >
                <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div 
            className="text-center py-8"
            role="alert"
            aria-live="assertive"
          >
            <div className="text-red-600 mb-2">
              {error instanceof Error ? error.message : 'Failed to load characters'}
            </div>
          </div>
        ) : data?.length === 0 ? (
          <div 
            className="text-center py-8 text-gray-600"
            role="status"
            aria-live="polite"
          >
            <p>
              No characters found for "<span className="font-semibold">{searchQuery}</span>"
            </p>
          </div>
        ) : (
          <div 
            className="grid px-4 py-4 sm:px-20 sm:py-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            role="grid"
            aria-label={searchQuery ? `Search results for ${searchQuery}` : "Character listing"}
          >
            {data?.map((character: Character) => (
              <div 
                key={character._id}
                role="gridcell"
                className="focus-within:ring-2 focus-within:ring-blue-300 rounded-lg"
              >
                <CharacterCard
                  id={character._id}
                  name={character.name}
                  imageUrl={character.imageUrl}
                  films={character.films}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section 
        aria-label="Featured Disney Characters"
        className="mt-8"
      >
        <FeaturedCharacters />
      </section>


      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white"
      >
        Skip to main content
      </a>
    </main>
  );
}