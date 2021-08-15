import React from 'react'

const Warning = ({ text, style }) => {
    return (
        <div className="warning" style={ style }>
            { text }
        </div>
    )
}

export default Warning
