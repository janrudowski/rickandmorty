import React, { SetStateAction } from 'react';
import { filterData, Gender, Status } from '../types';
import CustomSelect from './customselect/CustomSelect';

interface FilterModalProps {
  isModalOpen: boolean;
  filterData: filterData;
  setFilterData: React.Dispatch<SetStateAction<filterData>>;
  clearModal: () => void;
  handleModal: () => void;
}

const statusArr: Status[] = ['', 'alive', 'dead', 'unknown'];
const genderArr: Gender[] = ['', 'female', 'male', 'genderless', 'unknown'];

export default function FilterModal({
  isModalOpen,
  filterData,
  setFilterData,
  clearModal,
  handleModal,
}: FilterModalProps): JSX.Element {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFilterData((prev: filterData) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event?.preventDefault();
    handleModal();
  }

  return (
    <div className={`filtermodal-container ${isModalOpen ? 'open' : ''}`}>
      <div className='filtermodal-window'>
        <h2 className='filtermodal-window-header'>Filters</h2>
        <form className='filtermodal-form' onSubmit={handleSubmit}>
          <div className='filtermodal-form-inputgroup'>
            <label htmlFor='species'>Species</label>
            <input
              type='text'
              id='species'
              name='species'
              className='filtermodal-form-input'
              value={filterData.species}
              onChange={handleChange}
            />
          </div>
          <div className='filtermodal-form-inputgroup'>
            <label>Status</label>
            <CustomSelect
              styles={{ background: '#fff' }}
              items={statusArr}
              selected={filterData.status}
              setSelected={(item: Status) =>
                setFilterData((prev) => {
                  return {
                    ...prev,
                    status: item,
                  };
                })
              }
            />
          </div>
          <div className='filtermodal-form-inputgroup'>
            <label>Gender</label>
            <CustomSelect
              styles={{ background: '#fff' }}
              items={genderArr}
              selected={filterData.gender}
              setSelected={(item: Gender) =>
                setFilterData((prev) => {
                  return {
                    ...prev,
                    gender: item,
                  };
                })
              }
            />
          </div>
          <div className='filtermodal-form-inputgroup'>
            <label htmlFor='type'>Type</label>
            <input
              type='text'
              id='type'
              name='type'
              className='filtermodal-form-input'
              value={filterData.type}
              onChange={handleChange}
            />
          </div>

          <div className='filtermodal-form-buttons'>
            <button
              className='filtermodal-form-button clear-button'
              type='button'
              onClick={clearModal}
            >
              <span className='red'>
                Clear <span className='strong'>filters</span>
              </span>
            </button>
            <button className='filtermodal-form-button'>Apply</button>
          </div>
        </form>
      </div>
    </div>
  );
}
