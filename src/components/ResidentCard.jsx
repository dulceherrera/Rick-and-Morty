import React from 'react'
import useFetch from '../hooks/useFetch'
import {useEffect} from 'react'
import '../styles/residentCard.css'

const ResidentCard = ({url}) => {

  const [character, getCharacter] = useFetch(url)

  useEffect(() => {
    getCharacter()
  }, [])


  return (
    <>
      <article className='character'>
        <header className='character-header'>
          <img className='character-img'
          src = {character?.image}
          alt={character?.name}></img>
          <div className='character-status'>
            <div className={`character-status-circle ${character?.status}`}></div>
            <span className='character-status-value'>{character?.status}</span>
          </div>
        </header>
        <section className='character_body'>
          <h3 className='character-name'>{character?.name}</h3>
          <hr className='character-separator'></hr>
          <ul className='character-list'>
            <li className='character-item'>
              <span className='character-label'>Specie</span>
              <span className='character-item-value'> {character?.species}</span>
            </li>
            <li className='character-item'>
              <span className='character-label'>Origen</span>
              <span className='character-item-value'> {character?.origin.name}</span>
            </li>
            <li className='character-item'>
              <span className='character-label'>Episodes where appear</span>
              <span className='character-item-value'> {character?.episode.length}</span>
            </li>
          </ul>
        </section>
      </article>
    </>
  )
}

export default ResidentCard
