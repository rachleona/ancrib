import React, { Fragment, useContext, useEffect } from 'react'
import { StandardContext } from '../../utils/contexts'
import OptionRow from '../layout/OptionRow'

const Columnar = ({ updateOptions }) => {
    const formData = useContext(StandardContext)

    useEffect( () => {
        updateOptions({
            "key": "",
            "kEnc": formData.options.mode === "scytale" ? "utf8" : null
        }, true)
    }, [formData.options.mode])

    return (
        <Fragment>
            <OptionRow params={ ["mode"] }>
                <label>Mode</label>
                <select 
                    name="mode" 
                    value={ formData.options.mode || "columnar" } 
                    onChange={ e => { updateOptions(e.target) } }
                >
                    <option value="columnar">Classic</option>
                    <option value="scytale">Scytale</option>
                </select>
            </OptionRow>
            <OptionRow params={ formData.options.mode === "scytale" ?  ["k"] : ["k", "kformat"] }>
                <label>Secret Key</label>
                <input 
                    placeholder={ `Enter ${ formData.options.mode === "scytale" ? "integer " : "" }key` } 
                    name="key" 
                    value={ formData.options.key || "" } 
                    onChange={ e => { updateOptions(e.target) } }
                    style={ formData.options.mode === "scytale" ? {} : { width: "60%" } }
                />
                {
                    formData.options.mode === "scytale" ? "" :
                    <select
                        name="kEnc" 
                        value={ formData.options.kEnc || "utf8" } 
                        onChange={ e => { updateOptions(e.target) } }
                    >
                        <option value="utf8">text</option>
                        <option value="hex">hex</option>
                    </select>
                }
            </OptionRow>  
        </Fragment>
    )
}

export default Columnar
