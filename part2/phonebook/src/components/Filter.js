import React from 'react'

const Filter = ({ newFilterName, handleFilterNameChange }) => {
    return (
        <div>
            filter shown with: <input
                value={newFilterName}
                onChange={handleFilterNameChange}
            />
        </div>
    )
}

export default Filter