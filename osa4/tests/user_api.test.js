const mongoose = require('mongoose')
const supertest = require('supertest')
//const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is intially one user as db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('new unique username can be added', async () => {
		const usersAtStart = await User.find({})

		const newUser = {
			username: 'test',
			name: 'Matti Muttonen',
			password: 'salainen'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await User.find({})
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('error when adding too short username', async () => {
		const usersAtStart = await User.find({})

		const newUser = {
			username: 'te',
			name: 'Matti Muttonen',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('shorter than the minimum allowed length')

		const usersAtEnd = await User.find({})
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('error when adding too short password', async () => {
		const usersAtStart = await User.find({})

		const newUser = {
			username: 'testi5',
			name: 'Matti Muttonen',
			password: 'sa'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password must be at least 3 characters long')

		const usersAtEnd = await User.find({})
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('error when username alraedy exists', async () => {
		const usersAtStart = await User.find({})

		const newUser = {
			username: 'root',
			name: 'Matti Muttonen',
			password: 'salasana'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('expected `username` to be unique')

		const usersAtEnd = await User.find({})
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})