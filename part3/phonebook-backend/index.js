const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(morgan('tiny', {
    skip: (req, res) => { 
        return req.method === 'POST'
    }
}))

morgan.token('post-body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body', {
    skip: (req, res) => { 
        return req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE'
    }
}))


let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/info', (req, res) => {
    res.send(
        '<div>' +
        '<p>Phonebook has info for ' + persons.length + ' people</p>' +
        '<p>' + new Date() + '<p>' +
        '</div>'
    )
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    person = persons.find(p => p.id === id)
    if(!person) {
	return res.status(400).json({
            error: 'Person already deleted from the system'
	})
    }

    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!(body.name && body.number)) {
        return res.status(400).json({
            error: 'The name or number is missing'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'The name already exists in the phonebook'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})