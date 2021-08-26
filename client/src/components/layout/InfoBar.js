import React, { useEffect, useState, createElement } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import j2r from '../../utils/renderViewFromJson'
import ReactDOM from 'react-dom'

const InfoBar = ({ algos, open, setInfo }) => {
    const close = () => {
        setInfo(false)
    }

    const defaultState = {
        title: "This Project",
        text: {
            "type": "div",
            "children": [
                {
                    "type": "p",
                    "children": "AnCrib is my EPQ artefact project - an encryption web app built on the MERN stack. There are currently 9 different algorithms featured on this site, ranging from classic ciphers to modern hash functions. Some of them have several different modes so please take your time to explore!"
                },
                {
                    "type": "p",
                    "children": "Use the button on the top left corner to toggle the side menu and press the one of the top right (you already did!) to see more information about each algorithm. Always enter the unencrypted text in the plaintext box. If you want something decrypted, enter the encrypted text in the ciphertext box instead. Have fun!"
                }
            ]
        }
    }

    const [state, setState] = useState(defaultState)

    let location = useLocation()

    useEffect( () => {
        const getDesc = async () => {
            const path = location.pathname
            if(path === "/custom")
            {
                setState({
                    title: "Custom Series",
                    text: defaultState.text
                })
                return
            }
            const parts = path.split('/')
    
            if(parts[1] === "cipher" && algos[parts[2]])
            {
                try{
            
                    const desc = await axios.get(`/desc/${ parts[2] }`)
    
                    setState({
                        title: algos[parts[2]],
                        text: desc.data
                    })
    
                } catch(err){
                    setState({
                        title: algos[parts[2]],
                        text: "Sorry, something went wrong! We could not get the information you're looking for!"
                    })
                }
    
                return
            }
            
            setState(defaultState)

        }

        getDesc()

    }, [location])

    useEffect( () => {
        ReactDOM.hydrate(j2r(createElement, state.text), document.getElementById("info-content"))
    }, [state.text])

    return (
        <div id="info" style={ open ? { transform: "translate(0, 0)", WebkitTransform: "translate(0, 0)" } : {} }>
            <div className="info-title top">
                <h3>About</h3>
                <i className="fas fa-times" onClick={ close }></i>
            </div>
            <div className="info-title bottom">
                <h3>{ state.title }</h3>
            </div>
            <div className="line"></div>
            <div id="info-content">

            </div>
        </div>
    )
}

InfoBar.propTypes = {
    algos: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    setInfo: PropTypes.func.isRequired
}

export default InfoBar
