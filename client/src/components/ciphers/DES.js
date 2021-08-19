import React, { Fragment, useContext, useEffect } from 'react'
import { StandardContext } from '../../utils/contexts'
import OptionRow from '../layout/OptionRow'

const DES = ({ updateOptions }) => {
    const formData = useContext(StandardContext)

    useEffect(() => {
        updateOptions({
            "name": "kEnc",
            "value": "hex"
        })
    }, [formData.options.mode])

    return (
        <Fragment>
            <OptionRow params={ ["mode"] }>
                <label>Mode</label>
                <select
                    name="mode" 
                    value={ formData.options.mode || "lucifer" } 
                    onChange={ e => { updateOptions(e.target) } }
                >
                    <option value="lucifer">Classic</option>
                    <option value="triple">3DES</option>
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
        </Fragment>
    )
}

export default DES
