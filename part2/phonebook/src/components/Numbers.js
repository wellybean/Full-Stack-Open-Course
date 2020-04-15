import React from 'react'

const Numbers = ({ persons, newFilterName, handleRemoveContact }) => {
    const filteredList = persons.filter(person => person.name.toLowerCase().includes(newFilterName.toLowerCase()))

    if (filteredList.length === 0) {
        return <div>No person found</div>
    }

    return (
        <div>
            {filteredList.map((person, i) => 
                <div key={i}>
                    {person.name} {person.number} 
                    <button onClick={() => handleRemoveContact(person)}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Numbers