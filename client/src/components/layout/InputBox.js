import React, { useState, useEffect, Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import Warning from './Warning'
import { StandardContext } from '../../utils/contexts'

const InputBox = ({ type, enc, setFormData }) => {
    const [warning, setWarning] = useState("")
    let formData = useContext(StandardContext)

    // render warning message when needed
    useEffect( () => {
        formData.errors.some( err => {
            if(err.para === type[0])
            {
                setWarning(<Warning text={ err.msg } style={{ marginBottom: "10px" }}/>)
                return true
            }

            setWarning("")
            return false
        })
    }, [formData.errors])

    const updateForm = (type, value) => {
        setFormData({
            ...formData,
            [type[0]]: value
        })
    }

    const updateEnc = (value) => {
        setFormData({
            ...formData,
            "options": {
                ...formData.options,
                [`${ type[0] }Enc`]: value
            }
        })
    }

    return (
        <div className="input-box">
            <div className="text-input-top">
                {
                    type === "plaintext" ? <label>Plaintext</label> : ""
                }
                <select onChange={ e => updateEnc(e.target.value) } value={ formData.options[`${ type[0] }Enc`] }>
                    <option value="utf8" disabled={ !enc.utf8 }>text</option>
                    <option value="hex" disabled={ !enc.hex }>hexadecimal</option>
                </select>
                {
                    type === "ciphertext" ? <label>Ciphertext</label> : ""
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
            value={ formData[type[0]] } 
            onChange={ e => { updateForm(type, e.target.value) } }>
            
            </textarea>
        </div>
    )
}

InputBox.propTypes = {
    type: PropTypes.string.isRequired,
    enc: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired
}

export default InputBox
