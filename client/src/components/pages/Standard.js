import React, { useState, useEffect } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import axios from 'axios'

import CipherBox from '../layout/CipherBox'
import InputBox from '../layout/InputBox'
import Warning from '../layout/Warning'
import { StandardContext } from '../../utils/contexts'

const Standard = () => {
    const [state, setState] = useState({
        "p": "",
        "c": "",
        "options": "",
        "errors": []
    })

    const [warning, setWarning] = useState("")

    useEffect( () => {
        state.errors.some(err => {
            if(err.code == "SERVER_ERROR" )
            {
                setWarning(<Warning text={ "Something went wrong! Please try again" } style={{ marginBottom: "10px" }}/>)
                return
            }

            setWarning("")
        })
    }, [state.errors])

    const algos = {
        "caesar": {
            "title": "Caesar Cipher",
            "pEnc": { 
                "utf8": true, 
                "hex": true 
            },
            "cEnc": {
                "utf8": true, 
                "hex": true 
            }
        }, 
        "columnar": {
            "title": "Columnar Transposition",
            "pEnc": { 
                "utf8": true, 
                "hex": true 
            },
            "cEnc": {
                "utf8": true, 
                "hex": true 
            }
        }, 
        "vigenere": {
            "title": "Vigenere Cipher",
            "pEnc": { 
                "utf8": true, 
                "hex": true 
            },
            "cEnc": {
                "utf8": true, 
                "hex": true 
            }
        }, 
        "vernam": {
            "title": "Vernam Cipher",
            "pEnc": { 
                "utf8": true, 
                "hex": true 
            },
            "cEnc": {
                "utf8": true, 
                "hex": true 
            }
        }, 
        "enigma": {
            "title": "Enigma",
            "pEnc": { 
                "utf8": true, 
                "hex": false 
            },
            "cEnc": {
                "utf8": true, 
                "hex": false 
            }
        }, 
        "lucifer": {
            "title": "DES / 3DES",
            "pEnc": { 
                "utf8": true, 
                "hex": true 
            },
            "cEnc": {
                "utf8": false, 
                "hex": true 
            }
        }, 
        "rijndael": {
            "title": "AES",
            "pEnc": { 
                "utf8": true, 
                "hex": true 
            },
            "cEnc": {
                "utf8": false, 
                "hex": true 
            }
        }, 
        "md5": {
            "title": "MD5",
            "pEnc": { 
                "utf8": true, 
                "hex": true 
            },
            "cEnc": {
                "utf8": false, 
                "hex": true 
            }
        }, 
        "sha2": {
            "title": "SHA-256",
            "pEnc": { 
                "utf8": true, 
                "hex": true 
            },
            "cEnc": {
                "utf8": false, 
                "hex": true 
            }
        }
      }

    let location = useLocation()
    const path = location.pathname.split('/')[2]

    if(!algos[path])
    {
        return <Redirect to="/notfound" />
    }

    const submit = async req => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            const body = JSON.stringify({ ...state, algo: path })
            const res = await axios.post(`/crypt/${ req }`, body, config)


            setState({
                ...state,
                ...res.data
            })

        } catch(err){
            setState({
                ...state,
                errors: ["Something went wrong! Please try again"]
            })
        }
    }

    return (
        <div id="cipher">
            <StandardContext.Provider value={ state } >
                { warning }
                <InputBox type="plaintext" enc={ algos[path].pEnc } setFormData={ setState } />
                <div id="standard-cipher-box">
                    <CipherBox title={ algos[path].title } setFormData={ setState } algo={ path } />
                    <div className="buttons">
                        <button className="crypt-button" onClick={ () => { submit("encrypt") } }>encrypt <i className="fas fa-long-arrow-alt-down"></i></button>
                        <button className="crypt-button" onClick={ () => { submit("decrypt") } }><i className="fas fa-long-arrow-alt-up"></i> decrypt</button>
                    </div>
                </div>
                <InputBox type="ciphertext" enc={ algos[path].cEnc } setFormData={ setState } />
            </StandardContext.Provider>
        </div>
    )
}

export default Standard
