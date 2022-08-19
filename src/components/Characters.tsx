import React from 'react';
import { CharacterSchema } from '../types';
import Character from './Character';

interface CharactersProps {
  characters: CharacterSchema[];
}

export default function Characters({
  characters,
}: CharactersProps): JSX.Element {
  return (
    <main className='characters'>
      {characters.map((el) => {
        return <Character key={el.id} {...el} />;
      })}
    </main>
  );
}
