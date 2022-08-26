/// <reference types="Cypress" />
import user from '../page_objects/user'
import userData from '../fixtures/userData.json'

describe('testing CRUD operations for new user', () => {

let userId;

it('create user', () => {
    user.createUser().then((response) => {
        userId = response.body.id
    })
})

it('update user', () => {
    user.updateUser(userId).then(response => {
        expect(response.body.name).to.eq(userData.updatedName)
    })
})

it('delete user', () => {
    user.deleteUser(userId);
})

//geting the list of all users to asert that the user was deleted
it('get all users', () => {
    user.getUsers().then(response => {
        expect(response.body[0].id).to.not.eq(userId)
    })
})


})