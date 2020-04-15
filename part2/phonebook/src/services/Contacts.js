import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const createContact = (newContact) => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const removeContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateContact = (id, newContact) => {
    const request = axios.put(`${baseUrl}/${id}`, newContact)
    return request.then(response => response.data)
}

export default { createContact, removeContact, updateContact }