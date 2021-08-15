import React, { Fragment, useState, useContext, useEffect } from 'react'
import { StandardContext } from '../../utils/contexts'
import Warning from '../layout/Warning'

const Caesar = ({ setOptions, options }) => {
    const [warning, setWarning] = useState("")
    
    const formData = useContext(StandardContext)

    const updateOptions = e => {
        const v = e.target.value
        setOptions({
            ...options,
            [e.target.name]:v
        })
    }

    useEffect( () => {
        setWarning("")
        formData.errors.some( err => {
            if(err.para == "k")
            {
                setWarning(<Warning text={ err.msg } style={{ width: "100%" }} />)
                return true
            }
        })
    }, [formData.errors])

    return (
        <Fragment>
            <div className="options-row">
                <label>Secret Key</label>
                <input placeholder="Enter integer key" name="key" value={ formData.options.key } onChange={ e => { updateOptions(e) } }/>
                <Fragment>
                    { warning }
                </Fragment>
            </div>      
        </Fragment>
    )
}

export default Caesar
