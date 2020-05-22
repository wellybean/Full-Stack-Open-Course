const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
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
    test('blog has unique id property defined', async () => {
        const newBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const blogAdded = blogsAtEnd[blogsAtEnd.length - 1]
        expect(blogAdded.id).toBeDefined()
    })

    test('successfully creates new entry', async () => {
        const newBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
            likes: 5,
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map((blog) => blog.title)
        expect(titles).toContain('test title')
    })

    test('missing likes property defaults to 0', async () => {
        const newBlog = {
            title: 'test title',
            author: 'test author',
            url: 'test url',
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const blogAdded = blogsAtEnd[blogsAtEnd.length - 1]
        expect(blogAdded.likes).toBe(0)
    })

    test('missing title or url property returns status 400', async () => {
        const newBlog = {
            author: 'test author',
            url: 'test url',
        }
    
        await api.post('/api/blogs').send(newBlog).expect(400)
    
        let blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
        const otherNewBlog = {
            title: 'test title',
            author: 'test author',
        }
    
        await api.post('/api/blogs').send(otherNewBlog).expect(400)
    
        blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a single blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogAtStart = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogAtStart.id}`)
            .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    })

    test('fails with an invalid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const nonExistingId = '165451s51d5s1d5s1d5s15'
        await api
            .delete(`/api/blogs/${nonExistingId}`)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
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

afterAll(() => {
    mongoose.connection.close()
})
