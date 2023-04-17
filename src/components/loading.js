import React from 'react';
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import {GiBookshelf} from "react-icons/gi"

const Loading = () => {
  return (
    <div className='loading'>
        <h2 className='message'>Loading...</h2>
        <div className='iconDiv'><AiOutlineLoading3Quarters className='loadingIcon'/></div>
    </div>
  )
}

export default Loading