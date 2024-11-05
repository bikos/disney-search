import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCharacterById } from '@/services/api/disney';
import { FeaturedCharacters } from '@/components/common/FeaturedCharacters';

function CharacterDetails() {
  const getCharacterImage = (imageUrl: string | undefined) => {
    if (!imageUrl) return '';
    try {
      return imageUrl.split('/revision')[0];
    } catch  {
      return '';
    }
  };


  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(Number(id)),
    select: (response) => response.data,
  });

  return (
    <div className="container mx-auto bg-light-blue">
      <section className="px-4 sm:px-20 pt-4 sm:pt-20 pb-10">
        {isLoading ? (
          <div className="animate-pulse flex gap-12">
            <div className="w-[500px] h-[500px] bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <div className="text-red-600 mb-2">
              {error instanceof Error ? error.message : 'Failed to load character'}
            </div>
          </div>
        ) : data && (
          <div className="flex flex-col sm:flex-row gap-12">
            {/* Left side - Character Image */}
            <div className="w-full sm:w-[420px] h-[529px] flex-shrink-0">
              {!getCharacterImage(data.imageUrl) ? (
                <div className="animate-pulse h-full">
                  <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-4 h-full" />
                </div>
              ) : (
                <img
                  src={getCharacterImage(data.imageUrl)}
                  alt={data.name}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                  onError={(e) => {
                    e.currentTarget.parentElement?.classList.add('animate-pulse');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>

            {/* Right side - Character Details */}
            <div className="space-y-5">
              <div className="space-y-3">         <p className="text-4xl font-bold font-[lato]">
                {data.name}
              </p>
                <p className="text-xs font-[lato] leading-1">
                  Last Updated {new Date(data.updatedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p></div>

              <div className="space-y-8">
                {/* Films */}
                {data.films?.length > 0 && (
                  <div>
                    <p className="text-lg font-bold font-[lato] mb-1">
                      Featured Films
                    </p>
                    <ul className="list-disc pl-5 space-y-0">
                      {data.films.map((film: string, index: number) => (
                        <li key={index} className="text-[15px] font-semibold font-[lato]">
                          {film}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Short Films */}
                {data.shortFilms?.length > 0 && (
                  <div>
                    <p className="text-lg font-bold font-[lato] mb-1">
                      Short Films
                    </p>
                    <ul className="list-disc pl-5 space-y-0">
                      {data.shortFilms.map((film: string, index: number) => (
                        <li key={index} className="text-[15px] font-semibold font-[lato]">
                          {film}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* TV Shows */}
                {data.tvShows?.length > 0 && (
                  <div>
                    <p className="text-lg font-bold font-[lato] mb-1">
                      TV Shows
                    </p>
                    <ul className="list-disc pl-5 space-y-0">
                      {data.tvShows.map((show: string, index: number) => (
                        <li key={index} className="text-[15px] font-semibold font-[lato]">
                          {show}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>



              <div className='pt-10'>
                <a
                  href={data.sourceUrl}
                  target="_blank"  // Opens in new tab
                  rel="noopener noreferrer"  // Security best practice for external links
                  className="inline-block bg-disney-blue text-white px-6 py-3 rounded-lg font-[lato] text-[15px] font-semibold hover:opacity-80 transition-colors duration-300 shadow-[0_4px_8px_-2px_rgba(5,69,83,0.8)]"
                >
                  Explore More Character Details
                </a>
              </div>

            </div>
          </div>
        )}
      </section>
      <FeaturedCharacters />
    </div>
  );
}

export default CharacterDetails;