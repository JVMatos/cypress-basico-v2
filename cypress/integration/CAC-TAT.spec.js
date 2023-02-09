// <reference types="Cypress" />

const timer = 3000;

describe("Central de Atendimento ao Cliente TAT", () => {
    beforeEach(() => {
        cy.visit("../../src/index.html");
    });
    it("Verifica o título da aplicação", () => {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    });
    Cypress._.times(3, () => {
        it("Preenche os campos obrigatórios e envia o formulário", () => {
            const longText =
                "Testing a test with a test testing a test testing a test testing with a test testing a test testing a test testing";
            cy.get("#firstName").should("be.visible").type("João Vitor");
            cy.get("#lastName").should("be.visible").type("Matos");
            cy.get("#email")
                .should("be.visible")
                .type("joao.matos@fatecitapetininga.edu.br");
            cy.get("#open-text-area")
                .should("be.visible")
                .type(longText, { delay: 0 });
            cy.clock();
            cy.contains(".button", "Enviar").click();
            cy.get(".success")
                .should("be.visible")
                .should("contain.text", "Mensagem enviada com sucesso.");
            cy.tick(timer);
            cy.get(".success").should("not.be.visible");
        });
    });
    it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
        cy.get("#firstName").should("be.visible").type("João Vitor");
        cy.get("#lastName").should("be.visible").type("Matos");
        cy.get("#email")
            .should("be.visible")
            .type("joao.matos#fatecitapetininga.edu.br");
        cy.get("#open-text-area")
            .should("be.visible")
            .type("Ótima qualidade, parabéns!", { delay: 0 });
        cy.clock();
        cy.contains(".button", "Enviar").click();
        cy.get(".error")
            .should("be.visible")
            .should("contain.text", "Valide os campos obrigatórios!");
        cy.tick(timer);
        cy.get(".error").should("not.be.visible");
    });
    it("Valida se o campo telefone aceita apenas números.", () => {
        cy.get("#phone")
            .should("be.visible")
            .type("ABCDEF")
            .should("have.value", "");
    });
    it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário.", () => {
        cy.get("#firstName").should("be.visible").type("João Vitor");
        cy.get("#lastName").should("be.visible").type("Matos");
        cy.get("#email")
            .should("be.visible")
            .type("joao.matos@fatecitapetininga.edu.br");
        cy.get("#phone-checkbox").should("be.visible").check();
        cy.get("#open-text-area")
            .should("be.visible")
            .type("Ótima qualidade, parabéns!", { delay: 0 });
        cy.clock();
        cy.contains(".button", "Enviar").click();
        cy.get(".error")
            .should("be.visible")
            .should("contain.text", "Valide os campos obrigatórios!");
        cy.tick(timer);
        cy.get(".error").should("not.be.visible");
    });
    it("Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
        cy.get("#firstName")
            .type("João Vitor")
            .should("have.value", "João Vitor")
            .clear()
            .should("have.value", "");
        cy.get("#lastName")
            .type("Matos")
            .should("have.value", "Matos")
            .clear()
            .should("have.value", "");
        cy.get("#email")
            .type("joao.matos@fatecitapetininga.edu.br")
            .should("have.value", "joao.matos@fatecitapetininga.edu.br")
            .clear()
            .should("have.value", "");
        cy.get("#phone")
            .type("15999999999")
            .should("have.value", "15999999999")
            .clear()
            .should("have.value", "");
    });
    it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.", () => {
        cy.clock();
        cy.contains(".button", "Enviar").click();
        cy.get(".error")
            .should("be.visible")
            .should("contain.text", "Valide os campos obrigatórios!");
        cy.tick(timer);
        cy.get(".error").should("not.be.visible");
    });
    it("Envia o formuário com sucesso usando um comando customizado.", () => {
        cy.fillMandatoryFieldsAndSubmit();
    });
    it("Seleciona um produto (YouTube) por seu texto.", () => {
        cy.get("#product").select("YouTube").should("have.value", "youtube");
    });
    it("Seleciona um produto (Mentoria) por seu valor(value).", () => {
        cy.get("#product").select("mentoria").should("have.value", "mentoria");
    });
    it("Seleciona um produto (Blog) por seu índice.", () => {
        cy.get("#product").select(1).should("have.value", "blog");
    });
    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should("have.value", "feedback");
    });
    it("Marca cada tipo de atendimento.", () => {
        cy.get('input[type="radio"]')
            .should("have.length", 3)
            .each(($radio) => {
                cy.wrap($radio).check().should("be.checked");
            });
    });
    it("Marca ambos checkboxes, depois desmarca o último.", () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should("be.checked")
            .last()
            .uncheck()
            .should("not.be.checked");
    });
    it("Seleciona um arquivo da pasta fixtures.", () => {
        cy.get('input[type="file"]')
            .should("not.have.value")
            .selectFile("cypress/fixtures/example.json")
            .then((input) => {
                expect(input[0].files[0].name).to.equal("example.json");
            });
    });
    it("Seleciona um arquivo da pasta fixtures simulando um dragn and drop.", () => {
        cy.get('input[type="file"]')
            .should("not.have.value")
            .selectFile("cypress/fixtures/example.json", {
                action: "drag-drop",
            })
            .then((input) => {
                expect(input[0].files[0].name).to.equal("example.json");
            });
    });
    it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias.", () => {
        cy.fixture("example.json").as("sampleFile");
        cy.get('input[type="file"]')
            .should("not.have.value")
            .selectFile("@sampleFile")
            .then((input) => {
                expect(input[0].files[0].name).to.equal("example.json");
            });
    });
    it("Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique.", () => {
        cy.get("#privacy a").should("have.attr", "target", "_blank");
    });
    it("Acessa a página da política de privacidade removendo o target e então clicando no link.", () => {
        cy.get("#privacy a").invoke("removeAttr", "target").click();
        cy.contains("Talking About Testing").should("be.visible");
    });
    it("Exibe e esconde as mensagens de sucesso e erro usando o invoke.", () => {
        cy.get(".success")
            .should("not.be.visible")
            .invoke("show")
            .should("be.visible")
            .and("contain", "Mensagem enviada com sucesso.")
            .invoke("hide")
            .should("not.be.visible");
        cy.get(".error")
            .should("not.be.visible")
            .invoke("show")
            .should("be.visible")
            .and("contain", "Valide os campos obrigatórios!")
            .invoke("hide")
            .should("not.be.visible");
    });
    it("Preenche a area de texto usando o comando invoke.", () => {
        const longText = Cypress._.repeat("0123456789", 20);

        cy.get("#open-text-area")
            .invoke("val", longText)
            .should("have.value", longText);
    });
    it("Faz uma requisição HTTP no sistema online do CAC-TAT", () => {
        cy.request({
            method: "GET",
            url: "https://cac-tat.s3.eu-central-1.amazonaws.com/index.html",
        }).should((response) => {
            const { status, statusText, body } = response;
            expect(status).to.equal(200);
            expect(statusText).to.equal("OK");
            expect(body).to.include("CAC TAT");
        });
    });
    it.only("Encontrar o gato", () => {
        cy.get("#cat").invoke("show").should("be.visible");
        cy.get("#title").invoke("text", "CAT TAT");
        cy.get("#subtitle").invoke("text", "Y ❤️ CAT's");
    });
});
