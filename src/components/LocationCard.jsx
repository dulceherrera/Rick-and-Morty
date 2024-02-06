import React from 'react'
import '../styles/LocationCard.css'

const LocationCard = ({location}) => {


  return (
    <div className='container'>
      <article className='location article'>
        <h2 className='location-header'>{location?.name}</h2>
        <ul className='location-list'>
          <li className='location-item'>
            <span className='location-label'>Type:</span>
            <span className='location-item-value'> {location?.type}</span>
          </li>
          <li className='location-item'>
            <span className='location-label'>Dimension:</span>
            <span className='location-item-value'> {location?.dimension}</span>
          </li>
          <li className='location-item'>
            <span className='location-label'>Population:</span>
            <span className='location-item-value'> {location?.residents.length}</span>
          </li>
        </ul>
      </article>
    </div>
  )
}

export default LocationCard
