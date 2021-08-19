import React, { Fragment, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StandardContext } from '../../utils/contexts'
import OptionRow from '../layout/OptionRow'

const MD5 = ({ updateOptions }) => {
    const formData = useContext(StandardContext)

    useEffect(() => {
        if(formData.options.mode === "HMACmd5")
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
                    value={ formData.options.mode || "md5" } 
                    onChange={ e => { updateOptions(e.target) } }
                >
                    <option value={ "md5" }>Classic</option>
                    <option value={ "HMACmd5" }>HMAC</option>
                </select>
            </OptionRow>
            <OptionRow params={ ["k", "kEnc"] }>
                <label>Secret Key</label>
                <input 
                    placeholder="Enter key" 
                    name="key" 
                    value={ formData.options.key || "" } 
                    onChange={ e => { updateOptions(e.target) } } 
                    disabled={ formData.options.mode !== "HMACmd5"}
                />
                <select
                    name="kEnc" 
                    value={ formData.options.kEnc || "hex" } 
                    onChange={ e => { updateOptions(e.target) } }
                    disabled={ formData.options.mode !== "HMACmd5"}
                >
                    <option value="utf8">text</option>
                    <option value="hex">hex</option>
                </select>
            </OptionRow>
        </Fragment>
    )
}

MD5.propTypes = {
    updateOptions: PropTypes.func.isRequired
}

export default MD5
