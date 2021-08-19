import React from 'react'
import PropTypes from'prop-types'

const Warning = ({ text, style }) => {
    return (
        <div className="warning" style={ style }>
            { text }
        </div>
    )
}

Warning.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
}

export default Warning
