import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router'
import { NavLink } from "react-router";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header>
            <nav className='logo'>
                <NavLink to='/'><img src={Logo} alt="logo" /></NavLink>
            </nav>
            <nav className='candidates'>
                <NavLink to="/candidates">CANDIDATES</NavLink>
            </nav>
            <nav className='login'>
                <button onClick={() => { navigate('/login') }}>
                    LOGIN
                </button>
            </nav>
        </header>
    )
}

export default Header