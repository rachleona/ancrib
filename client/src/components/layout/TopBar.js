import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useWindowDimensions from '../../utils/windowDimensions'

const TopBar = ({ side, setSide }) => {
    const { width } = useWindowDimensions()
    const toggleSideMenu = () => {
        setSide(!side)
    }

    useEffect( () => {
        if(width <= 767 && side )
        {
            toggleSideMenu()
        }
    } , [width])
    
    return (
        <div id="top">
            <h1><i className="fas fa-bars" onClick={ toggleSideMenu }></i></h1>
            <h1 id="title"><Link to="/">AnCrib</Link></h1>
            <h1><i className="fas fa-info-circle"></i></h1>
        </div>
    )
}

export default TopBar
