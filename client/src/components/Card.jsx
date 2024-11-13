import React from 'react';

const Card = ({ photo, prompt }) => {
  return (
    <div>
      <img src={photo} alt={prompt} />
    </div>
  )
}

export default Card;
