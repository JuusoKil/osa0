const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialNotes = [
	{
		title: 'Api Test 1',
		author: 'JK',
		url: 'www.apitest1.com',
		likes: 10
	},
	{
		title: 'Api Test 2',
		author: 'Test',
		url: 'www.apitest2.com',
		likes: 7
	}
]

describe('when there is initially blogs saved to db', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(initialNotes)
	})

	test('blogs are returned in JSON format', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('app returns right amount of blogs', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialNotes.length)
	})

	test('documents identifier is named id', async () => {
		const response = await api.get('/api/blogs')
		
		const id = response.body[0].id

		expect(id).toBeDefined()
	})

	describe('adding a new blog', () => {
		test('a new blog can be added', async () => {
			const blogsBefore = await Blog.find({})

			const newBlog = {
				title: 'New blog test',
				author: 'SuperTest',
				url: 'www.SuperTest.com',
				likes: 101
			}

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const blogsAfter = await Blog.find({})

			expect(blogsAfter).toHaveLength(blogsBefore.length + 1)

			const titles = blogsAfter.map(b => b.title)
			expect(titles).toContain(
				'New blog test'
			)
		})

		test('likes value is 0 if input has no likes value', async () => {
			const newBlog = {
				title: 'Likes test',
				author: 'has no value',
				url: 'www.test.com',
			}

			const result = await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			expect(result.body.likes).toEqual(0)
		})

		test('400 bad request if title has not been submitted', async () => {
			const newBlog = {
				author: 'No title test',
				url: 'www.notitle.com',
				likes: 1021
			}

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400)
		})

		test('400 bad request if url has not been submitted', async () => {
			const newBlog = {
				title: 'No url',
				author: 'No url test',
				likes: 1021
			}

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400)
		})
	})

	describe('deleting a blog from db', () => {
		test('a blog can be deleted', async () => {
			const blogsBefore = await Blog.find({})
			const blogToDelete = blogsBefore[0].toJSON()
			//console.log(`There is ${blogsBefore.length} blogs`)
			//console.log(blogToDelete)

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.expect(204)

			const blogsAfter = await Blog.find({})

			expect(blogsAfter).toHaveLength(initialNotes.length - 1)

			const titles = blogsAfter.map(b => b.title)

			expect(titles).not.toContain(blogToDelete.title)
		})
	})

	describe('updating a blog', () => {
		test('blogs likes can be updated', async () => {
			const blogsBefore = await Blog.find({})
			const blogToUpdate = blogsBefore[0].toJSON()

			const blog = {
				title: 'Api Test 1',
				author: 'JK',
				url: 'www.apitest1.com',
				likes: 10001
			}

			await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(blog)
				.expect(202)

			const blogsAfter = await Blog.find({})

			expect(blogsAfter[0].likes).toEqual(blog.likes)
		})
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})