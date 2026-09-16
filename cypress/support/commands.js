// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, senha) => { 
    cy.get('#email').type(email, {log: false})
    cy.get('#password').type(senha, {log: false})
    cy.get('#login-btn').click()
    cy.url().should('include', 'dashboard')
 })

// Preenche e envia o formulário de cadastro com os dados informados
Cypress.Commands.add('cadastrarUsuario', (usuario) => {
    cy.get('#name').type(usuario.name)
    cy.get('#email').type(usuario.email)
    if (usuario.phone) {
        cy.get('#phone').type(usuario.phone)
    }
    cy.get('#password').type(usuario.password, {log: false})
    cy.get('#confirm-password').type(usuario.password, {log: false})
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
})

