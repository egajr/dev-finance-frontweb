import { ReactComponent as Logo } from './logo.svg';
import React from 'react';

function Navbar() {
    return (
        <nav className="main-navbar" id="logo" >
            <header>
                <Logo />
            </header>
        </nav>
    )
}

export default Navbar;

