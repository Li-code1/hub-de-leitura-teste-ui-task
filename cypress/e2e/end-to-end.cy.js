const { faker } = require('@faker-js/faker')

describe('Testes End To End do fluxo de cadastro e login', () => {

    /* 
    Testes End To End ou Testes de ponta a ponta, ligam uma série de funcionalidades de um sistema,
    simulando o comportamento do usuário final. Esses testes verificam se diferentes partes do sistema
    funcionam corretamente quando integradas, garantindo que o fluxo completo de uma funcionalidade
    funcione como esperado.
    Aqui iremos criar um teste end to end que cobre o fluxo de cadastro e login de um usuário em um sistema web.
    Em apenas um teste, ou seja, em um único "it", iremos:
    1. Acessar a página de cadastro.
    2. Preencher o formulário de cadastro com dados válidos.
    3. Submeter o formulário e verificar se o cadastro foi bem-sucedido.
    4. Acessar a página de login.
    5. Preencher o formulário de login com as credenciais do usuário recém-cadastrado.
    6. Submeter o formulário de login e verificar se o login foi bem-sucedido.

    Use as boas práticas aprendidas até agora para estruturar o teste.
    */

    beforeEach(() => {
        // Massa de dados fictícia, gerada dinamicamente com Faker para evitar
        // conflito de e-mail duplicado entre execuções
        cy.wrap({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: '11987654321',
            password: faker.internet.password({ length: 10 })
        }).as('usuario')
    });


    it('Deve fazer o cadastro e validar o login com o usuário cadastrado', function () {
        // 1. Acessar a página de cadastro
        cy.visit('/register.html')

        // 2 e 3. Preencher e enviar o formulário de cadastro com dados válidos
        cy.cadastrarUsuario(this.usuario)

        // Resultado esperado do cadastro
        cy.get('#alert-container')
            .should('be.visible')
            .and('have.class', 'alert-success')
            .and('contain.text', 'sucesso')

        // 4. Acessar a página de login (sessão limpa, sem aproveitar o login automático do cadastro)
        cy.clearLocalStorage()
        cy.visit('/login.html')

        // 5 e 6. Preencher e enviar o login com as credenciais recém-cadastradas
        cy.login(this.usuario.email, this.usuario.password)

        // Resultado esperado do login
        cy.url().should('include', '/dashboard.html')
    });
});
