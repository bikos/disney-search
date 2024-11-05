const API_BASE_URL = 'https://api.disneyapi.dev';

export const getCharacters = async (page = 1) => {
  const response = await fetch(`${API_BASE_URL}/character?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const searchCharacter = async (query: string) => {
  const response = await fetch(`${API_BASE_URL}/character?name=${query}`);
  if (!response.ok) {
    throw new Error('Failed to search characters');
  }
  return response.json();
};

export const getCharacterById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }
  return response.json();
};