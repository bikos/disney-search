import { useQuery } from '@tanstack/react-query';
import { CharacterCard } from '../common/CharacterCard';
import { getCharacterById } from '../../services/api/disney';
import { FEATURED_CHARACTER_IDS } from '@/utils/defaultCharacters';
import { ApiResponse, Character } from '@/types/api';

export function FeaturedCharacters() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['featuredCharacters'],
    queryFn: async () => {
      const responses = await Promise.all(
        FEATURED_CHARACTER_IDS.map((id: number) => getCharacterById(id))
      );
      return responses.map((response: ApiResponse) => response.data);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <div className="grid grid-cols-4 gap-6 px-20 pb-20">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>;
  }

  if (error) {
    return <div className="text-red-600">Failed to load featured characters</div>;
  }

  return (
    <section className="bg-disney-blue mb-10 px-20 pb-20 pt-10">
      <h2 className="font-normal text-4xl  text-white font-[lato] mb-10 text-center">Featured Characters!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((character: Character) => (
          <CharacterCard
            key={character._id}
            id={character._id}
            name={character.name}
            imageUrl={character.imageUrl}
            films={character.films}
          />
        ))}
      </div>
    </section>
  );
}