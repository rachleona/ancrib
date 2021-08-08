import React from 'react'
import { Link } from 'react-router-dom'

const MenuItem = ({ text, name }) => {
    return (
        <div className="menuitem">
            <Link to={ `/cipher/${ name }` }>{ text }</Link>
        </div>
    )
}

export default MenuItem
