import React from 'react'

const NewPersonForm = (props) => {
    const { addPerson, newName, newPhoneNumber, handleNameChange, handlePhoneNumberChange } = props

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>number: <input
                value={newPhoneNumber}
                onChange={handlePhoneNumberChange}
            />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NewPersonForm