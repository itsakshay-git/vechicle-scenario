import React from 'react'
import { Link } from 'react-router-dom'
import './SideNav.css'


const SideNav = () => {
  return (
        <div className='sidenav'>
          <ul className='list'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-scenario">All Scenario</Link>
            </li>
            <li>
              <Link to="/create-scenario">Add Scenario</Link>
            </li>
            <li>
              <Link to="/create-vehicle">Add Vechicle</Link>
            </li>
          </ul>
        </div>
  )
}

export default SideNav