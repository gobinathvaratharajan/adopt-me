import { useEffect, useState } from "react"
import Pet from "./Pet";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("")
  const [animal, setAnimal] = useState("")
  const [breed, setBreed] = useState("")
  const [pets, setPets] = useState([])
  const [breeds] = useBreedList(animal)

  useEffect(() => {
    requestPets();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );
    const json = await res.json()
    setPets(json.pets)
  }

  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          <input id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label htmlFor="Animal">
          <select id="animal" placeholder="animal" value={animal} onChange={(e) => {setAnimal(e.target.value); setBreed("")}} onBlur={(e) => {setAnimal(e.target.value); setBreed("")}}>
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
              ))}
          </select>
        </label>
        <label htmlFor="breed">
          <select id="breed" placeholder="breed" value={breed} onChange={(e) => setBreed(e.target.value)} onBlur={(e) => setBreed(e.target.value)}>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
              ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map((pet) => <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />)}
    </div>
  )
}

export default SearchParams

/*

<div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input  />
        </label>
        <button>Submit</button>
      </form>
    </div>
*/
