import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

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

export default { getAll, createContact, removeContact, updateContact }