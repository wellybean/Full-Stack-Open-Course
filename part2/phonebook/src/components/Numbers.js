import React from 'react'

const Numbers = ({ persons, newFilterName }) => {
    const filteredList = persons.filter(person => person.name.toLowerCase().includes(newFilterName.toLowerCase()))

    if (filteredList.length === 0) {
        return <div>No person found</div>
    }

    return (
        <div>
            {filteredList.map((person, i) => <div key={i}>{person.name} {person.phoneNumber}</div>)}
        </div>
    )
}

export default Numbers