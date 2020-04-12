import React, { useState } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456' },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523' },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newFilterName, setNewFilterName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const handleFilterNameChange = (event) => {
    setNewFilterName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      phoneNumber: newPhoneNumber
    }
    if (persons.filter(person => person.name === newPerson.name).length === 0) {
      setPersons(persons.concat(newPerson))
    } else {
      alert(`${newPerson.name} already exists in phonebook`)
    }
    setNewName('')
    setNewPhoneNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilterName={newFilterName}
        handleFilterNameChange={handleFilterNameChange}
      />
      <h1>add a new</h1>
      <NewPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} newFilterName={newFilterName} />
    </div>
  )
}

export default App