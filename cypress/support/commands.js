Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
    const longText =
        "Testing a test with a test testing a test testing a test testing a test testing";
    cy.get("#firstName").should("be.visible").type("João Vitor");
    cy.get("#lastName").should("be.visible").type("Matos");
    cy.get("#email")
        .should("be.visible")
        .type("joao.matos@fatecitapetininga.edu.br");
    cy.contains("#support-type > :nth-child(3)", "Elogio")
        .should("be.visible")
        .click();
    cy.get("#open-text-area").should("be.visible").type(longText, { delay: 0 });
    cy.contains(".button", "Enviar").click();
    cy.get(".success")
        .should("be.visible")
        .should("contain.text", "Mensagem enviada com sucesso.");
});
