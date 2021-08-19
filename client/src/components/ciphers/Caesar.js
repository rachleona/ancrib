import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { StandardContext } from '../../utils/contexts'
import OptionRow from '../layout/OptionRow'

const Caesar = ({ updateOptions }) => {
    
    const formData = useContext(StandardContext)

    return (
        <Fragment>
            <OptionRow params={ ["k"] }>
                <label>Secret Key</label>
                <input placeholder="Enter integer key" name="key" value={ formData.options.key || "" } onChange={ e => { updateOptions(e.target) } }/>
            </OptionRow>      
        </Fragment>
    )
}

Caesar.propTypes = {
    updateOptions: PropTypes.func.isRequired
}

export default Caesar
