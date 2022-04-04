import React from 'react';
import './faceRecognition.css';


function FaceRecognition({box,imageurl}) {
  return (
   <div className='center ma' >
      <div className='absolute mt2'>
         <img id='face' alt='' src={imageurl} width='700px' heigh='auto' />
          <div className='bounding_box' 
               style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol,}}></div>
      </div>
   </div>
  );
}

export default FaceRecognition;