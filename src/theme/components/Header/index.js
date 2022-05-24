import React from 'react';
import './header.css';

function Header() {

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
            <img src='http://dioly.com.br/LogoCFP.png' className='navbar-logo' alt='' />
        </div>
      </nav>
    </>
  );
}

export default Header;