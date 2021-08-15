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
    const [options, setOptions] = useState({})

    const formData = useContext(StandardContext)

    useEffect( () => {
        setFormData({
            ...formData,
            options
        })
    }, [options])

    const algos = {
        "caesar": <Caesar setOptions={ setOptions } options={ options }/>, 
        "columnar": <Columnar setOptions={ setOptions } />, 
        "vigenere": <Vigenere setOptions={ setOptions } />, 
        "vernam": <Vernam setOptions={ setOptions } />, 
        "enigma": <Enigma setOptions={ setOptions } />, 
        "lucifer": <DES setOptions={ setOptions } />, 
        "rijndael": <AES setOptions={ setOptions } />, 
        "md5": <MD5 setOptions={ setOptions } />, 
        "sha2": <SHA2 setOptions={ setOptions } />
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
