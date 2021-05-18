describe("Each game is selectable", () => {
  it("Can select Chomp", () => {
    cy.visit("http://127.0.0.1:5500/index.html")
    .get('#startChomp')
    .click()
    cy.get('#gameChomp').should('be.visible')
  });
  
  it("Can select Obstruction", () => {
    cy.visit("http://127.0.0.1:5500/index.html")
    .get('#startObstruction')
    .click()
    cy.get('#gameObstruction').should('be.visible')
  });
  it("Can select Connect4", () => {
    cy.visit("http://127.0.0.1:5500/index.html")
    .get('#startConnect4')
    .click()
    cy.get('#gameConnect4').should('be.visible')
  });

});

describe("Each game can be started", () => {
    it("Can play Chomp", () => {
      cy.visit("http://127.0.0.1:5500/index.html")
      .get('#startChomp').click()
      cy.get('#startGame').click()
      cy.get('#game').should('be.visible')
    });
    
    it("Can play Obstruction", () => {
      cy.visit("http://127.0.0.1:5500/index.html")
      .get('#startObstruction').click()
      cy.get('#gameObstruction').click()
      cy.get('#startGame').click()
      cy.get('#game').should('be.visible')
    });

    it("Can play Connect4", () => {
      cy.visit("http://127.0.0.1:5500/index.html")
      .get('#startConnect4').click()
      cy.get('#gameConnect4').click()
      cy.get('#startGame').click()
      cy.get('#game').should('be.visible')
    });
  
  });
