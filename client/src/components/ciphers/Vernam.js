import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { StandardContext } from '../../utils/contexts'
import OptionRow from '../layout/OptionRow'

const Vernam = ({ updateOptions }) => {
    const formData = useContext(StandardContext)

    return (
        <Fragment>
            <OptionRow params={ ["k", "kEnc"] }>
                <label>Secret Key</label>
                <input placeholder="Enter key" name="key" value={ formData.options.key || "" } onChange={ e => { updateOptions(e.target) } }/>
                <select
                    name="kEnc" 
                    value={ formData.options.kEnc || "utf8" } 
                    onChange={ e => { updateOptions(e.target) } }
                >
                    <option value="utf8">text</option>
                    <option value="hex">hex</option>
                </select>
            </OptionRow>
        </Fragment>
    )
}

Vernam.propTypes = {
    updateOptions: PropTypes.func.isRequired
}

export default Vernam
