import React from 'react';
import Search from './Search.js';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className='developed-by'>
                <a className='website-link' href='https://www.nicksynes.com'>nicksynes.com</a>
            </div>
            <div className="header">
                <Search />
            </div>
        </div>

    )
}

export default Header;