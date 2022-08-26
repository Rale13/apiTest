import userData from '../fixtures/userData.json'
const faker = require('@faker-js/faker')


module.exports = {

    getUsers() {
        return cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users'
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    },
    
    createUser()
    {
        //using faker to always get a unique email adress for the new user
        const userEmail = {email: faker.internet.exampleEmail()} 
        return cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: 'Bearer 712b47a4cc82f415cfb4cdf24fb3573216f71f3aedd4b897e6a0d9aa305a591a'
            },
            body: {
                "name": userData.name,
                "email": userEmail.email,
                "gender": userData.genderMale,
                "status": userData.statusActive
            },
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    },

    updateUser(userId)
    {
        return cy.request({
            method: 'PATCH',
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                Authorization: 'Bearer 712b47a4cc82f415cfb4cdf24fb3573216f71f3aedd4b897e6a0d9aa305a591a'
            },
            body: {
                "name": userData.updatedName,
                "email": userData.updatedEmail,
                "status": userData.statusActive
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    },

    deleteUser(userId)
    {
        return cy.request({
            method: 'DELETE',
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                Authorization: 'Bearer 712b47a4cc82f415cfb4cdf24fb3573216f71f3aedd4b897e6a0d9aa305a591a'
            },
        }).then((response) => {
            expect(response.status).to.eq(204)
        })
    }
}