import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import logo from '../../assets/images/meta-mask-logo.png'

import './nav-bar.css'

const NavBar = ({ routes, extras }) => (
  <div className="NavBar">
    <img src={logo} alt="Logo" className="NavBar-logo" />
    {routes.map(r => (
      <div className="NavBar-route">
        {r.isExternal ? (
          <a
            href={r.to}
            target="_blank"
            rel="noopener noreferrer"
            className="NavBar-route-link"
          >
            {r.title}
          </a>
        ) : (
          <NavLink
            exact
            to={r.to}
            className="NavBar-route-link"
            activeClassName="is-active"
          >
            {r.title}
          </NavLink>
        )}
      </div>
    ))}
    {extras.map(e => <div className="NavBar-extra">{e}</div>)}
  </div>
)

NavBar.propTypes = {
  // State
  routes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    isExternal: PropTypes.bool
  }).isRequired,
  extras: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired
}

export default NavBar
