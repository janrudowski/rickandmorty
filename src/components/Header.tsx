import React, { SetStateAction, useRef } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { filterData } from '../types';

interface HeaderProps {
  handleModal: () => void;
  filterData: filterData;
  setFilterData: React.Dispatch<SetStateAction<filterData>>;
}

export default function Header({
  handleModal,
  filterData,
  setFilterData,
}: HeaderProps): JSX.Element {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setFilterData((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  }

  return (
    <header className='header'>
      <div className='header-image-container'>
        {' '}
        <img
          className='header-image'
          src='/images/background.jpg'
          alt='background'
        />
        <img className='header-logo-image' src='/images/logo.png' alt='logo' />
      </div>

      <div className='search'>
        <FiSearch
          className='search-icon'
          onClick={() => searchRef.current!.focus()}
        />
        <input
          type='text'
          className='search-field'
          ref={searchRef}
          placeholder='Search...'
          value={filterData.name}
          onChange={handleChange}
        />
        <FiFilter className='search-icon' onClick={handleModal} />
      </div>
    </header>
  );
}
