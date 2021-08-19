import React, { useContext, Fragment, useState, useEffect } from 'react'
import { StandardContext } from '../../utils/contexts'
import OptionRow from '../layout/OptionRow'

const Enigma = ({ updateOptions }) => {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const [state, setState] = useState({
        standard: false,
        r1: "",
        r2: "",
        r3: ""
    })

    const formData = useContext(StandardContext)

    const standardRotors = [
        {
            "seq": "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
            "notch": "X",
            "start": 9
        },
        {
            "seq": "AJDKSIRUXBLHWTMCQGZNPYFVOE",
            "notch": "S",
            "start": 1
        },
        {
            "seq": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
            "notch": "M",
            "start": 22
        },
        {
            "seq": "ESOVPZJAYQUIRHXLNFTGKDCMWB",
            "notch": "Q",
            "start": 7
        },
        {
            "seq": "VZBRGITYUPSDNHLXAWMJQOFECK",
            "notch": "K",
            "start": 6
        }
    ]

    const changeRotor = e => {
        const v = e.target.value
        const n = e.target.name

        setState({
            ...state,
            [n]: v
        })

        updateOptions({
            [`${ n }Seq`]: standardRotors[v].seq,
            [`${ n }Notch`]: standardRotors[v].notch,
            [`${ n }Start`]: standardRotors[v].start
        }, true)
    }

    useEffect(() =>{
        if(state.standard)
        {
            const obj = {}
            const rotors = ["r1", 'r2', "r3"]

            rotors.map( v => {
                if(state[v] !== "") 
                {
                    obj[`${ v }Seq`] = standardRotors[state[v]].seq
                    obj[`${ v }Notch`] = standardRotors[state[v]].notch
                    obj[`${ v }Start`] = standardRotors[state[v]].start
                }
            })
            
            updateOptions(obj, true)
        }
    }, [state.standard])

    return (
        <Fragment>
            <OptionRow params={ ["k"] }>
                <label><input type="checkbox" checked={ state.standard } onChange={ () => { setState({...state, "standard": !state.standard}) } }/> Standard rotors</label>
                <select 
                    name="r1" 
                    value={ state.r1 } 
                    onChange={ e => { changeRotor(e) } }
                    disabled={ !state.standard }
                    style={{ width: "33.3%" }}
                >
                    <option value="" disabled>Select first rotor...</option>
                    <option value={ 0 }>Rotor I</option>
                    <option value={ 1 }>Rotor II</option>
                    <option value={ 2 }>Rotor III</option>
                    <option value={ 3 }>Rotor IV</option>
                    <option value={ 4 }>Rotor V</option>
                </select>
                <select 
                    name="r2" 
                    value={ state.r2 } 
                    onChange={ e => { changeRotor(e) } }
                    disabled={ !state.standard }
                    style={{ width: "33.3%" }}
                >
                    <option value="" disabled>Select second rotor...</option>
                    <option value={ 0 }>Rotor I</option>
                    <option value={ 1 }>Rotor II</option>
                    <option value={ 2 }>Rotor III</option>
                    <option value={ 3 }>Rotor IV</option>
                    <option value={ 4 }>Rotor V</option>
                </select>
                <select 
                    name="r3" 
                    value={ state.r3 } 
                    onChange={ e => { changeRotor(e) } }
                    disabled={ !state.standard }
                    style={{ width: "33.3%" }}
                >
                    <option value="" disabled>Select third rotor...</option>
                    <option value={ 0 }>Rotor I</option>
                    <option value={ 1 }>Rotor II</option>
                    <option value={ 2 }>Rotor III</option>
                    <option value={ 3 }>Rotor IV</option>
                    <option value={ 4 }>Rotor V</option>
                </select>
            </OptionRow>
            <OptionRow params={ ["r1Seq", "r1Notch", "r1Start", "r1"]}>
            <label>Rotor 1</label>
                <input 
                    placeholder={ `Enter sequence` } 
                    name="r1Seq" 
                    value={ formData.options.r1Seq || "" } 
                    onChange={ e => { 
                        setState({ ...state, "standard": false })
                        updateOptions(e.target)
                    } }
                />
                <select
                    name="r1Notch" 
                    value={ formData.options.r1Notch || "" } 
                    onChange={ e => { 
                        setState({ ...state, "standard": false })
                        updateOptions(e.target)
                    } }
                    style={{ width: "20%" }}
                >
                    <option disabled value="">Select Notch</option>
                    {
                        Array(26).fill(0).map( (v, i) => {
                            return <option key={ i }>{ alphabets[i] }</option>
                        })
                    }
                </select>
                <select
                    name="r1Start" 
                    value={ formData.options.r1Start || "" } 
                    onChange={ e => { 
                        setState({ ...state, "standard": false })
                        updateOptions(e.target)
                    } }
                    style={{ width: "20%" }}
                >
                    <option disabled value="">Start Position</option>
                    {
                        Array(26).fill(0).map( (v, i) => {
                            return <option key={ i }>{ i + 1 }</option>
                        })
                    }
                </select>
            </OptionRow>
            <OptionRow params={ ["r2Seq", "r2Notch", "r2Start", "r2"]}>
            <label>Rotor 2</label>
                <input 
                    placeholder={ `Enter sequence` } 
                    name="r2Seq" 
                    value={ formData.options.r2Seq || "" } 
                     onChange={ e => { 
                        setState({ ...state, "standard": false })
                        updateOptions(e.target)
                    } }
                />
                <select
                    name="r2Notch" 
                    value={ formData.options.r2Notch || "" } 
                     onChange={ e => { 
                        setState({ ...state, "standard": false })
                        updateOptions(e.target)
                    } }
                    style={{ width: "20%" }}
                >
                    <option disabled value="">Select Notch</option>
                    {
                        Array(26).fill(0).map( (v, i) => {
                            return <option key={ i }>{ alphabets[i] }</option>
                        })
                    }
                </select>
                <select
                    name="r2Start" 
                    value={ formData.options.r2Start || "" } 
                     onChange={ e => { 
                        setState({ ...state, "standard": false })
                        updateOptions(e.target)
                    } }
                    style={{ width: "20%" }}
                >
                    <option disabled value="">Start Position</option>
                    {
                        Array(26).fill(0).map( (v, i) => {
                            return <option key={ i }>{ i + 1 }</option>
                        })
                    }
                </select>
            </OptionRow>
            <OptionRow params={ ["r3Seq", "r3Notch", "r3Start", "r3"]}>
            <label>Rotor 3</label>
                <input 
                    placeholder={ `Enter sequence` } 
                    name="r3Seq" 
                    value={ formData.options.r3Seq || "" } 
                     onChange={ e => { 
                        setState({ ...state, "standard": false })
                        updateOptions(e.target)
                    } }
                />
                <select
                    name="r3Notch" 
                    value={ formData.options.r3Notch || "" } 
                    style={{ width: "20%" }}
                     onChange={ e => { 
                        setState({ ...state, "standard": false })
                        updateOptions(e.target)
                    } }
                >
                    <option disabled value="">Select Notch</option>
                    {
                        Array(26).fill(0).map( (v, i) => {
                            return <option key={ i }>{ alphabets[i] }</option>
                        })
                    }
                </select>
                <select
                    name="r3Start" 
                    value={ formData.options.r3Start || "" } 
                     onChange={ e => { 
                        setState({ ...state, "standard": false })
                        updateOptions(e.target)
                    } }
                    style={{ width: "20%" }}
                >
                    <option disabled value="">Start Position</option>
                    {
                        Array(26).fill(0).map( (v, i) => {
                            return <option key={ i }>{ i + 1 }</option>
                        })
                    }
                </select>
            </OptionRow>
        </Fragment>
    )
}

export default Enigma
