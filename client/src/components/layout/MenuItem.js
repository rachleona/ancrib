import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MenuItem = ({ text, name }) => {
    return (
        <Link to={ `/cipher/${ name }` }>
            <div className="menuitem">
                <span>{ text }</span>
            </div>
        </Link>
    )
}

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default MenuItem
