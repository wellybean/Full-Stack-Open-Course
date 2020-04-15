import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Numbers from './components/Numbers'
import axios from 'axios'
import contacts from './services/Contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newFilterName, setNewFilterName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
 
  const handleFilterNameChange = (event) => {
    setNewFilterName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleRemoveContact = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
        contacts.removeContact(person.id)
        setPersons(persons.filter(p => p.id !== person.id))
    }
}

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newPhoneNumber
    }

    // New person's name not in phonebook
    if (persons.filter(person => person.name === newPerson.name).length === 0) {
      contacts.createContact(newPerson).then(returnedContact => {
        setPersons(persons.concat(returnedContact))
      })
    } 
    // New Person already exists
    else {
      const message = `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      if(window.confirm(message)) {
        const id = persons.filter(person => person.name === newPerson.name).id
        contacts.updateContact(id, newPerson)
        setPersons(persons.map(p => p.name === newPerson.name ? newPerson : p))
      }
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
      <Numbers 
        persons={persons} 
        newFilterName={newFilterName} 
        handleRemoveContact={handleRemoveContact}
      />
    </div>
  )
}

export default App