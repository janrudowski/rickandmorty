import React, { useState } from 'react';

import { CharacterSchema } from '../types';

import { formatDate } from '../utils/formatDate';

export default function Character(props: CharacterSchema): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className='character'>
      <div className='character-image-container'>
        <img
          src='/images/placeholder.jpeg'
          alt='placeholder'
          style={{ display: loading ? 'block' : 'none' }}
        />
        <img
          className='character-image'
          src={`${props.image}`}
          alt='character'
          onLoad={() => setLoading(false)}
          style={{ display: loading ? 'none' : 'block' }}
        />
      </div>

      <p className='character-name'>{props.name}</p>
      <div className='character-details'>
        <h2 className='character-details-header'>Details</h2>
        <p className='character-details-detail'>
          <span className='character-details-detail-category'>Status:</span>
          <span className='character-details-detail-text'>{props.status}</span>
        </p>
        <p className='character-details-detail'>
          <span className='character-details-detail-category'>Species:</span>
          <span className='character-details-detail-text'>{props.species}</span>
        </p>
        <p className='character-details-detail'>
          <span className='character-details-detail-category'>Type:</span>
          <span className='character-details-detail-text'>
            {props.type || <i>N/A</i>}
          </span>
        </p>
        <p className='character-details-detail'>
          <span className='character-details-detail-category'>Gender:</span>
          <span className='character-details-detail-text'>{props.gender}</span>
        </p>
        <p className='character-details-detail'>
          <span className='character-details-detail-category'>Created:</span>
          <span className='character-details-detail-text'>
            {formatDate(props.created)}
          </span>
        </p>
      </div>
    </div>
  );
}
