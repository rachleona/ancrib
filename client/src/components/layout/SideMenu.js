import React from 'react'
import MenuItem from './MenuItem'

const SideMenu = ({ open, setSide, algos }) => {

    const toggleSideMenu = () => {
        setSide(!open)
    }

    return (
        <div id="menu" style={ open ? {} : { transform: "translate(-100%, 0)", WebkitTransform: "translate(-100%, 0)" } }>
            <div id="menu-title">
                <h3>Ciphers</h3>
                <i className="fas fa-times" onClick={ toggleSideMenu }></i>
            </div>
            <div className="line"></div>
            {
                Object.keys(algos).map( name => (
                    <MenuItem key={ name } text={ algos[name] } name={ name } />
                ))
            }
        </div>
    )
}

export default SideMenu
