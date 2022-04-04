import React from 'react';
import './imagelinkform.css'



const ImageLinkForm = ({oninchange,onsubmit}) => {
  return (
    <div>
      <p className='f3'>
         {'This Magic Brain will detect faces in your pictures.Git it a try.'}
      </p>
      <div className='center '>
         <div className=' center form  pa4 br3 shadow-3'>
           <input className='f4 pa2 w-70 center' type='text' onChange={oninchange}/>
             <button className='ba b--purple br3  w-30 grow f4 link ph3  pv2 dib white bg-light-purple'
                     onClick={onsubmit}>
             Detect
             </button>
         </div>
      </div>
    </div>
  );
}

export default ImageLinkForm ;