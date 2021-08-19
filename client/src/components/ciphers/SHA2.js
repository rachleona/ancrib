import React, { Fragment, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StandardContext } from '../../utils/contexts'
import OptionRow from '../layout/OptionRow'

const SHA2 = ({ updateOptions }) => {
    const formData = useContext(StandardContext)

    useEffect(() => {
        if(formData.options.mode === "HMACsha2")
        {
            updateOptions({
                "name": "kEnc",
                "value": "hex"
            })
        }
    }, [formData.options.mode])

    return (
        <Fragment>
        <OptionRow params={ ["mode"] }>
            <label>Mode</label>
            <select
                name="mode" 
                value={ formData.options.mode || "sha2" } 
                onChange={ e => { updateOptions(e.target) } }
            >
                <option value={ "sha2" }>Classic</option>
                <option value={ "HMACsha2" }>HMAC</option>
            </select>
        </OptionRow>
        <OptionRow params={ ["k", "kEnc"] }>
            <label>Secret Key</label>
            <input 
                placeholder="Enter key" 
                name="key" 
                value={ formData.options.key || "" } 
                onChange={ e => { updateOptions(e.target) } } 
                disabled={ formData.options.mode !== "HMACsha2"}
            />
            <select
                name="kEnc" 
                value={ formData.options.kEnc || "hex" } 
                onChange={ e => { updateOptions(e.target) } }
                disabled={ formData.options.mode !== "HMACsha2"}
            >
                <option value="utf8">text</option>
                <option value="hex">hex</option>
            </select>
        </OptionRow>
    </Fragment>
    )
}

SHA2.propTypes = {
    updateOptions: PropTypes.func.isRequired
}

export default SHA2
