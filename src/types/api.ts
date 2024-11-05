export interface Character {
    _id: number;
    name: string;
    imageUrl: string;
    films: string[];
    shortFilms: string[];
    tvShows: string[];
    videoGames: string[];
    parkAttractions: string[];
    allies: string[];
    enemies: string[];
    sourceUrl: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    __v: number;
  }
  
  export interface ApiResponse {
    info: {
      count: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: null | string;
    };
    data: Character;
  }