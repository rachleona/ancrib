import React, { useEffect, useState, createElement } from 'react'
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
                    "children": "AnCrib is my EPQ project and this part is supposed to be some introduction to the project but I seriously don't know what to write right now I'll add these in next time so just typing in random stuff right now to use as placeholders."
                },
                {
                    "type": "p",
                    "children": "Like probably unnecessarily long but gotta make it look realistic you know. Seriously though I'm so good at spouting nonsense even if I say so myself like this entire passage has no real content I'm just writing this to fill the void and make my design look realistic? But anyway I think this is long enough to be convincing so I'll stop here and go write some actual code ok bye"
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

export default InfoBar
