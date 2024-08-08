import React from 'react'
import { NavLink } from 'react-router-dom'

const Category = () => {
  return (
    <div className='catlist'>
      <NavLink
        to="cuisine/Indian"
        style={({ isActive }) => ({
          textDecoration: isActive ? 'underline' : 'none'
        })}
      >
        <h4>Indian</h4>
      </NavLink>
      <NavLink
        to="cuisine/Italian"
        style={({ isActive }) => ({
          textDecoration: isActive ? 'underline' : 'none'
        })}
      >
        <h4>Italian</h4>
      </NavLink>
      <NavLink
        to="cuisine/Japanese"
        style={({ isActive }) => ({
          textDecoration: isActive ? 'underline' : 'none'
        })}
      >
        <h4>Japanese</h4>
      </NavLink>
      <NavLink
        to="cuisine/American"
        style={({ isActive }) => ({
          textDecoration: isActive ? 'underline' : 'none'
        })}
      >
        <h4>American</h4>
      </NavLink>
    </div>
  )
}

export default Category
