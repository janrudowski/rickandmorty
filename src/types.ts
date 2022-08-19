export type Status = '' | 'alive' | 'dead' | 'unknown';
export type Gender = '' | 'female' | 'male' | 'genderless' | 'unknown';

export interface filterData {
  name: string;
  species: string;
  status: Status;
  gender: Gender;
  type: string;
}

interface ResponseDataSuccess {
  //interface for recived data from API
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ResponseCharacter[];
}

interface ResponseDataError {
  error: string;
}

export type ResponseData = ResponseDataSuccess | ResponseDataError;

export interface ResponseCharacter {
  //interface for character recived from API. schema: https://rickandmortyapi.com/documentation/#character-schema
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: { name: string; url: string };
  name: string;
  origin: { name: string; url: string };
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface CharacterSchema {
  id: number;
  name: string;
  image: string;
  status: string;
  type: string;
  gender: string;
  created: string;
  species: string;
}
