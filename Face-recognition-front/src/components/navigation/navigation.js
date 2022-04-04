import React from 'react';


function Navigation({onroutechange}) {
  return (
    <nav style={{display:'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onroutechange('signin')} className='f2 link dim black underline pa3 pointer'> Sign out </p>
    </nav>
  );
}

export default Navigation;