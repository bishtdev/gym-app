import React from 'react'

function Header({ index, title, description } ) {
    console.log(title)
    return (
      <div>
        <div>
          <p>{index}</p>
          <h4>{title}</h4>
        </div>
        <p>{description}</p>
      </div>
    );
  }
export default Header