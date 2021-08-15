import React, { useState, useEffect, Fragment, useContext } from 'react'
import Warning from './Warning'
import { StandardContext } from '../../utils/contexts'

const InputBox = ({ type, enc, setFormData }) => {
    const [warning, setWarning] = useState("")
    let formData = useContext(StandardContext)

    // render warning message when needed
    useEffect( () => {
        formData.errors.some( err => {
            if(err.para == type)
            {
                setWarning(<Warning text={ err.msg } style={{ marginBottom: "10px" }}/>)
            }
        })
    }, [formData.errors])

    const updateForm = (type, value) => {
        setFormData({
            ...formData,
            [type == "plaintext" ? "p" : "c"]: value
        })
    }

    return (
        <div className="input-box">
            <div className="text-input-top">
                {
                    type == "plaintext" ? <label>Plaintext</label> : ""
                }
                <select>
                    <option value="utf8" disabled={ !enc.utf8 }>text</option>
                    <option value="hex" disabled={ !enc.hex }>hexadecimal</option>
                </select>
                {
                    type == "ciphertext" ? <label>Ciphertext</label> : ""
                }
            </div>
            <Fragment>
                { warning }
            </Fragment>
            <textarea 
            placeholder={ `Enter ${ type }` } 
            maxLength="5000" 
            className="text-input" 
            id={ type }
            value={ formData[type == "plaintext" ? "p" : "c"] } 
            onChange={ e => { updateForm(type, e.target.value) } }>
            
            </textarea>
        </div>
    )
}

export default InputBox
