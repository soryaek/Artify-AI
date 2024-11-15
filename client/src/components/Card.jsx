import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({_id, photo, prompt, name }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img className="w-full h-auto object-cover rounded-xl text-md"src={photo} alt={prompt} />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-3 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className="flex items-center gapv-2">
            <div className="w-7 h-7 rounded-full object-cover bg-[#6469ff] flex justify-center items-center text-white text-xs">
              {name[0].toUpperCase()}
            </div>
            <p className="text-white text-sm ml-3">{name}</p>
          </div>
          <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className="w-6 h-6 object-container invert"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card;
