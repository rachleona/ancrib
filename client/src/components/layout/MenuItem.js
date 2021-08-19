import React from 'react'
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

export default MenuItem
