import { useState, useEffect, useRef } from 'react'
import './App.css'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'
import logorm from './assets/logorm.png'
import useFetch from './hooks/useFetch'

function App() {

  const [locationId, setLocationId] = useState(getRandomNumber(126))
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8;


  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [location, getLocation, isLoading, hasError] = useFetch(url);

  useEffect(() => {
    if(locationId !== ""){
    getLocation()
    }
  }, [locationId])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputLocation.current.value.trim() !== ""){
      setLocationId(inputLocation.current.value.trim())
    }
  }

  const inputLocation = useRef();

  const paginateCharacters = () => {
    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    return location?.residents.slice(startIndex, endIndex)
  }

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1)
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const totalPages = Math.ceil(location?.residents.length / charactersPerPage)

  const goToPage = (page) => {
    setCurrentPage(page);
  }

  const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1)

  return (
    <>
    <div>
      {
        isLoading ?
          <h2>Loading...</h2>
        :
        <>
          <div style = {{display: 'flex', justifyContent: 'center', alignItems: "center"}}>
            <img src={logorm} alt='Rick and Morty logo' className='img-header'></img>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type='number'
              ref={inputLocation}
              placeholder='Type a number (1 to 126)'
            ></input>
            <button onClick={handleSubmit} className='button-form'>Search</button>
          </form>
          {
            hasError || locationId === '0'?
            <h2>This location do not exist</h2>
            :
            <>
              <LocationCard
              location = {location}
              />
              <div className='character-container'>
                {paginateCharacters()?.map((resident) => (
                  <ResidentCard
                    url = {resident}
                    key ={resident}
                  />
                  ))
                }
              </div>
                <div className='pagination'>
                  {
                    pageNumbers.map(pageNumber => (
                      <button
                        className={pageNumber === currentPage ? 'active' : ''}
                        onClick={() => goToPage(pageNumber)}
                        key = {pageNumber}
                      >{pageNumber}</button>
                    ))
                  }
                </div>
                <div className='pagination'>
                  <button
                    onClick={goToPreviousPage} disabled = {currentPage === 1}
                  >Anterior</button>
                  <button
                    onClick={goToNextPage}
                    disabled = {location?.residents.length <= currentPage * charactersPerPage}
                  >Siguiente</button>
                </div>
            </>
          }
        </>
      }
    </div>
    </>
  )
}

export default App
