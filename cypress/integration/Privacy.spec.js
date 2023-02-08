it.only('Testa a página da política de privacidade de forma independente.', () => {
    cy.visit("../../src/privacy.html");
    cy.contains('CAC TAT - Política de privacidade').should('be.visible');
    cy.contains('Talking About Testing').should('be.visible');
})