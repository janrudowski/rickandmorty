import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Characters from './components/Characters';
import Pagination from './components/Pagination';
import FilterModal from './components/FilterModal';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import DarkModeSwitch from './components/DarkModeSwitch';
import { useDarkMode } from './contexts/DarkModeContext';

import {
  filterData,
  CharacterSchema,
  ResponseData,
  ResponseCharacter,
} from './types';

const API_URL: string = 'https://rickandmortyapi.com/api/character/';

function App(): JSX.Element {
  const { dark } = useDarkMode()!;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [filterData, setFilterData] = useState<filterData>({
    name: '',
    species: '',
    status: '',
    gender: '',
    type: '',
  });

  const [results, setResults] = useState<CharacterSchema[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<string>('');

  function handleModal() {
    setIsModalOpen((prev: boolean) => !prev);
    document.body.style.overflow = isModalOpen ? 'scroll' : 'hidden';
    window.scrollTo(0, 0);
  }

  function clearModal(): void {
    setFilterData((prev: filterData) => {
      return {
        ...prev,
        species: '',
        status: '',
        gender: '',
        type: '',
      };
    });
    handleModal();
  }

  async function fetchData() {
    try {
      setLoading(true);
      const { name, status, species, type, gender } = filterData;
      const response = await fetch(
        `${API_URL}?page=${currentPage}&name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`
      );
      const data: ResponseData = await response.json();

      if ('error' in data) {
        throw new Error('No results.');
      }

      if (data.results.length === 0) {
        throw new Error('No results.');
      }

      setErrorMessage('');

      setResults(() => {
        return data.results.map((el: ResponseCharacter): CharacterSchema => {
          return {
            id: el.id,
            name: el.name,
            status: el.status,
            species: el.species,
            image: el.image,
            type: el.type,
            created: el.created,
            gender: el.gender,
          };
        });
      });
      setPages(data.info.pages);
    } catch (err) {
      setResults([]);
      setPages(0);
      setCurrentPage(1);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unknown error has occurred.');
      }
      console.clear();
      //to prevent chrome (this happens only in chrome) from showing error 404 when no results found ("no results error" is handled above so theres no need to show it in console)
    }
    setLoading(false);
  }

  useEffect((): void => {
    fetchData();
  }, [filterData, currentPage]);

  useEffect((): void => {
    setCurrentPage(1);
  }, [filterData]);

  let element: JSX.Element;

  //check if there is an error message if not render spinner then render data
  if (errorMessage) {
    element = <ErrorMessage message={errorMessage} />;
  } else if (loading) {
    element = <LoadingSpinner />;
  } else {
    element = (
      <>
        <Characters characters={results} />
        <Pagination
          pageCount={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
  }

  return (
    <div className={`container ${dark ? 'dark' : ''}`}>
      <DarkModeSwitch />
      <FilterModal
        isModalOpen={isModalOpen}
        filterData={filterData}
        setFilterData={setFilterData}
        clearModal={clearModal}
        handleModal={handleModal}
      />
      <Header
        handleModal={handleModal}
        filterData={filterData}
        setFilterData={setFilterData}
      />
      {element}
    </div>
  );
}

export default App;
