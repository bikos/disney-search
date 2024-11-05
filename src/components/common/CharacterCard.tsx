import { Link } from 'react-router-dom';

interface CharacterCardProps {
  id: number;
  name: string;
  imageUrl: string;
  films?: string[];
}

export function CharacterCard({ id, name, imageUrl, films }: CharacterCardProps) {
  return (
    <div className="w-full  sm:w-[248px] h-[416px] bg-white shadow-lg rounded-sm overflow-hidden transition-all duration-300">
      <div className="w-full sm:w-[248px] h-[248px] relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-character.png';
          }}
        />
      </div>
      <div className="py-4 px-2 flex flex-col h-[150px] text-center"> 
        <p className="font-bold text-lg font-[lato] truncate leading-5">{name}</p>
        <div className=" mt-3"> 
          <p className="font-bold text-[15px] font-[lato] leading-5">
            Featured Films
          </p>
          {films && films.length > 0 && (
            <p className="text-[11px] font-[lato] line-clamp-2 overflow-hidden">
              {films.join(', ')}
            </p>
          )}
        </div>
        <Link
          to={`/character/${id}`}
          className="text-xs font-black underline font-[lato] mt-auto"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          VIEW PROFILE
        </Link>
      </div>
    </div>
  );
}