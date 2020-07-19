const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returns correct amount of entries', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('addition of a new blog', () => {

    beforeEach(async () => {
        await User.deleteMany({})

    })

    test('blog has unique id property defined', async () => {
    
        const newUser = {
            username: 'userForToken',
            name: 'userForToken',
            password: 'userForToken',
        }
    
        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send({username: newUser.username, password: newUser.password})
    
        const token = result.body.token

        const newBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
        }

        await api
            .post('/api/blogs')
            .set( 'authorization', 'bearer ' + token )
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const blogAdded = blogsAtEnd[blogsAtEnd.length - 1]
        expect(blogAdded.id).toBeDefined()
    })

    test('successfully creates new entry', async () => {

        const newUser = {
            username: 'userForToken',
            name: 'userForToken',
            password: 'userForToken',
        }
    
        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send({username: newUser.username, password: newUser.password})
    
        const token = result.body.token

        const newBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
            likes: 5,
        }
    
        await api
            .post('/api/blogs')
            .set( 'authorization', 'bearer ' + token )
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map((blog) => blog.title)
        expect(titles).toContain('test title')
    })

    test('missing likes property defaults to 0', async () => {

        const newUser = {
            username: 'userForToken',
            name: 'userForToken',
            password: 'userForToken',
        }
    
        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send({username: newUser.username, password: newUser.password})
    
        const token = result.body.token

        const newBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
        }
    
        await api
            .post('/api/blogs')
            .set( 'authorization', 'bearer ' + token )
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const blogAdded = blogsAtEnd[blogsAtEnd.length - 1]
        expect(blogAdded.likes).toBe(0)
    })

    test('missing title or url property returns status 400', async () => {

        const newUser = {
            username: 'userForToken',
            name: 'userForToken',
            password: 'userForToken',
        }
    
        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send({username: newUser.username, password: newUser.password})
    
        const token = result.body.token

        const newBlog = {
            author: 'test author',
            url: 'test url',
        }
    
        await api
            .post('/api/blogs')
            .set( 'authorization', 'bearer ' + token )
            .send(newBlog)
            .expect(400)
    
        let blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
        const otherNewBlog = {
            title: 'test title',
            author: 'test author',
        }
    
        await api
            .post('/api/blogs')
            .set( 'authorization', 'bearer ' + token )
            .send(otherNewBlog)
            .expect(400)
    
        blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    test('fails with missing token', async () => {
        
        const newBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('deletion of a single blog', () => {
    test('succeeds with a valid id', async () => {

        const blogsAtStart = await helper.blogsInDb()

        const newUser = {
            username: 'userForToken',
            name: 'userForToken',
            password: 'userForToken',
        }
    
        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send({username: newUser.username, password: newUser.password})
    
        const token = result.body.token

        const newBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
        }
    
        await api
            .post('/api/blogs')
            .set( 'authorization', 'bearer ' + token )
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtMiddle = await helper.blogsInDb()
        expect(blogsAtMiddle).toHaveLength(blogsAtStart.length + 1)

        await api
            .delete(`/api/blogs/${blogsAtMiddle[blogsAtMiddle.length - 1].id}`)
            .set( 'authorization', 'bearer ' + token )
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('fails with an invalid id', async () => {

        const blogsAtStart = await helper.blogsInDb()

        const newUser = {
            username: 'userForToken',
            name: 'userForToken',
            password: 'userForToken',
        }
    
        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send({username: newUser.username, password: newUser.password})
    
        const token = result.body.token

        const newBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
        }
    
        await api
            .post('/api/blogs')
            .set( 'authorization', 'bearer ' + token )
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtMiddle = await helper.blogsInDb()
        expect(blogsAtMiddle).toHaveLength(blogsAtStart.length + 1)

        await api
            .delete('/api/blogs/nsbkdjnslkdmlskmdsk')
            .set( 'authorization', 'bearer ' + token )
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtMiddle.length)
    })
})

describe('updating a blog', () => {
    test('is sucessful with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogAtStart = blogsAtStart[0]
        const newBlog = {...blogAtStart, likes: 37}
        await api
            .put(`/api/blogs/${blogAtStart.id}`).send(newBlog).expect(200)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toBe(37)
    })

    test('fails with an invalid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogAtStart = blogsAtStart[0]
        const newBlog = {...blogAtStart, likes: 37}
        const nonExistingId = '5d1s65ds65d165s1d55'
        await api
            .put(`/api/blogs/${nonExistingId}`).send(newBlog).expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toBe(helper.initialBlogs[0].likes)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
  
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
  
        await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
  
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is too small', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'uy',
            name: 'Superuser',
            password: 'salainen',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('name should have at least three characters')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is too small', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'uy515',
            name: 'Superuser',
            password: 'sa',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('password should have at least three characters')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
