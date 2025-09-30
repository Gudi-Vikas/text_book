import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to='/news' className="sidebar-option">
                    <img className="avatar" src={'https://ui-avatars.com/api/?name=Skills&background=6c5ce7&color=fff&size=64&bold=true&rounded=true'} alt="skills" />
                    <p>News</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar
