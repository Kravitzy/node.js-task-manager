const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

// clear the users from db
beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'John',
        email: 'john@example.com',
        password: 'MyPass787'
    }).expect(201)

    // assert sure user was added
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // asertion about the respone
    // expect(response.body.user.name).toBe('Yonatan') // single
    expect(response.body).toMatchObject({
        user: {
            name: 'John',
            email: 'john@example.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('MyPass787')
})

test('Should Loging existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)


    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[0].token)

})

test('Should not login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrongpassword'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // set headers
        .send()
        .expect(200)
})

test('Should not get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // set headers
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()

})

test('Should not delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // set headers
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update a valid user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // set headers
        .send({
            name: 'Jess'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe('Jess')
})

test('should not update a invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // set headers
        .send({
            location: 'lod'
        })
        .expect(400)
})