import React, { Fragment, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StandardContext } from '../../utils/contexts'
import OptionRow from '../layout/OptionRow'

const AES = ({ updateOptions }) => {
    const formData = useContext(StandardContext)

    useEffect(() => {
        updateOptions({
            "name": "kEnc",
            "value": "hex"
        })
    }, [formData.options.mode])

    return (
        <Fragment>
            <OptionRow params={ ["bit"] }>
                <label>Mode</label>
                <select
                    name="bit" 
                    value={ formData.options.bit || 128 } 
                    onChange={ e => { updateOptions(e.target) } }
                >
                    <option value={ 128 }>128-bit</option>
                    <option value={ 196 } disabled>196-bit</option>
                    <option value={ 256 } disabled>256-bit</option>
                </select>
            </OptionRow>
            <OptionRow params={ ["k", "kEnc"] }>
                <label>Secret Key</label>
                <input placeholder="Enter key" name="key" value={ formData.options.key || "" } onChange={ e => { updateOptions(e.target) } }/>
                <select
                    name="kEnc" 
                    value={ formData.options.kEnc || "hex" } 
                    onChange={ e => { updateOptions(e.target) } }
                >
                    <option value="utf8">text</option>
                    <option value="hex">hex</option>
                </select>
            </OptionRow>
            <OptionRow params={ ["r"] }>
                <label>Number of rounds</label>
                <input 
                    type="number"
                    placeholder="Enter an integer" 
                    name="rounds" 
                    value={ formData.options.rounds || "" } 
                    onChange={ e => { updateOptions(e.target) } }
                />
            </OptionRow>
        </Fragment>
    )
}

AES.propTypes = {
    updateOptions: PropTypes.func.isRequired
}

export default AES
