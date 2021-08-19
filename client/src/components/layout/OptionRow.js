import React, { useContext, useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StandardContext } from '../../utils/contexts'
import Warning from './Warning'

const OptionRow = ({ children, params }) => {
    const [warning, setWarning] = useState("")
    const formData = useContext(StandardContext)

    useEffect( () => {
        setWarning("")
        formData.errors.some( err => {
            if(params.includes(err.para))
            {
                setWarning(<Warning text={ err.msg } style={{ width: "100%" }} />)
                return true
            }
            return false
        })
    }, [formData.errors])

    return (
        <div className="options-row">
            { children }
            <Fragment>
                { warning }
            </Fragment>
        </div>
    )
}

OptionRow.propTypes = {
    params: PropTypes.array.isRequired
}

export default OptionRow
