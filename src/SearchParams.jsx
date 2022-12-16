import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import fetchSearch from './fetchSearch';
import Result from './Result';
import useBreedList from './useBreedList';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    animal: '',
    location: '',
    breed: '',
  });
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);

  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form className='p-10 m-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get('animal') ?? '',
            location: formData.get('location') ?? '',
            breed: formData.get('breed') ?? '',
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          Location
          <input type="text" name="location" placeholder="Location" id="location" className='search-input' />
        </label>
        <label htmlFor="Animal">
          Animal
          <select className='search-input'
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} name="breed" id="breed" className='search-input grayed-out-disabled'>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button className='rounded px-6 py-2 border-none text-white bg-orange-500 hover:opacity-50'>Submit</button>
      </form>
      <Result pets={pets} />
    </div>
  );
};

export default SearchParams;
