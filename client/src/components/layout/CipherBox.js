import React, { useState, useEffect, useContext } from 'react'

import Caesar from '../ciphers/Caesar'
import Columnar from '../ciphers/Columnar'
import Vigenere from '../ciphers/Vigenere'
import Vernam from '../ciphers/Vernam'
import Enigma from '../ciphers/Enigma'
import AES from '../ciphers/AES'
import DES from '../ciphers/DES'
import MD5 from '../ciphers/MD5'
import SHA2 from '../ciphers/SHA2'
import { StandardContext } from '../../utils/contexts'

const CipherBox = ({ title, algo, setFormData }) => {
    
    const formData = useContext(StandardContext)
    const [options, setOptions] = useState({})

    const updateOptions = (e, multi=false) => {
        if(!multi)
        {
            const v = e.value
            setOptions({
                ...options,
                [e.name]: v
            })
            return
        }

        setOptions({
            ...options,
            ...e
        })
    }

    useEffect( () => {
        setOptions({})
    }, [title])

    useEffect( () => {
        setFormData({
            ...formData,
            options: {
                ...formData.options,
                ...options
            }
        })
    }, [options])

    const algos = {
        "caesar": <Caesar updateOptions={ updateOptions }/>, 
        "columnar": <Columnar updateOptions={ updateOptions } />, 
        "vigenere": <Vigenere updateOptions={ updateOptions }/>, 
        "vernam": <Vernam updateOptions={ updateOptions }/>, 
        "enigma": <Enigma updateOptions={ updateOptions } />, 
        "lucifer": <DES updateOptions={ updateOptions }/>, 
        "rijndael": <AES updateOptions={ updateOptions }/>, 
        "md5": <MD5 updateOptions={ updateOptions }/>, 
        "sha2": <SHA2 updateOptions={ updateOptions }/>
      }

    return (
        <div className="cipher-options">
            <h4>{ title }</h4>
            {
                algos[algo]
            } 

        </div>
    )
}

export default CipherBox
