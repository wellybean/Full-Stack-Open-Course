import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Numbers from './components/Numbers'
import contacts from './services/Contacts'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newFilterName, setNewFilterName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    contacts
      .getAll()
      .then(response => {
        setPersons(response)
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
    if (window.confirm(`Delete ${person.name}?`)) {
      contacts
        .removeContact(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotificationType('success')
          setNotificationMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationType('error')
          setNotificationMessage(
            `${person.name} was already removed from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== person.name))
        })
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
      contacts
        .createContact(newPerson)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNotificationType('success')
          setNotificationMessage(
            `Added ${returnedContact.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationType('error')
          setNotificationMessage(
            `${error.response.data.error}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
    // New person already exists
    else {
      const message = `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {
        const id = persons.find(person => person.name === newPerson.name).id
        contacts
          .updateContact(id, newPerson)
          .then(returnedContact => {
            setPersons(persons.map(p =>
              p.name === returnedContact.name ? returnedContact : p
            ))
            setNotificationType('success')
            setNotificationMessage(
              `Changed number for ${newPerson.name}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationType('error')
            console.log(error.response)
            if(error.response.status === 404) {
              setNotificationMessage(
                `${newPerson.name} was already removed from server`
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.name !== newPerson.name))
            } else {
              setNotificationMessage(
                `${error.response.data.error}`
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            }
          })
      }
    }

    setNewName('')
    setNewPhoneNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        type={notificationType}
      />
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