describe("todo App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow to enter text", () => {
    cy.get("#inputBox")
      .type("learn cypress")
      .should("have.value", "learn cypress");
  });
  it("should save new todo", () => {
    cy.get("#inputBox")
      .type("learn cypress")
      .should("have.value", "learn cypress");
    cy.get("#saveATodoButton").click();
    cy.get("#list").get("li").should("have.length", 1);
  });
  it("should save next todo", () => {
    cy.get("#inputBox")
      .type("learn cypress")
      .should("have.value", "learn cypress");
    cy.get("#saveATodoButton").click();
    cy.get("#list").get("li").should("have.length", 1);
    cy.get("#inputBox")
      .type("learn faster")
      .should("have.value", "learn faster");
    cy.get("#saveATodoButton").click();
    cy.get("#list").get("li").should("have.length", 2);
  });
  it("should have a checkbox and check it", () => {
    cy.get("#inputBox")
      .type("learn cypress")
      .should("have.value", "learn cypress");
    cy.get("#saveATodoButton").click();
    cy.get("#list").get("li").should("have.length", 1);
    cy.get("#inputBox")
      .type("learn faster")
      .should("have.value", "learn faster");
    cy.get("#saveATodoButton").click();
    cy.get("#list").get("li").should("have.length", 2);
    cy.get('[type="checkbox"]').check();
  });
  it("uncheck first entry in the list", () => {
    cy.get("#inputBox")
      .type("learn cypress")
      .should("have.value", "learn cypress");
    cy.get("#saveATodoButton").click();
    cy.get("#list").get("li").should("have.length", 1);
    cy.get("#inputBox")
      .type("learn faster")
      .should("have.value", "learn faster");
    cy.get("#saveATodoButton").click();
    cy.get("#list").get("li").should("have.length", 2);
    cy.get('[type="checkbox"]').check();
    cy.get("#list")
      .get("li")
      .first("data-cy", "doneButton")
      .find('[type="checkbox"]')
      .uncheck();
  });
  it("should remove done todos", () => {
    cy.get("#inputBox")
      .type("learn cypress")
      .should("have.value", "learn cypress");
    cy.get("#saveATodoButton").click();
    cy.get("#list").get("li").should("have.length", 1);
    cy.get("#inputBox")
      .type("learn faster")
      .should("have.value", "learn faster");
    cy.get("#saveATodoButton").click();
    cy.get("#list").get("li").should("have.length", 2);
    cy.get('[type="checkbox"]').check();
    cy.get("#list")
      .get("li")
      .first("data-cy", "doneButton")
      .find('[type="checkbox"]')
      .uncheck();
    cy.get("#removeDoneTodosButton").click();
    cy.get("#list").get("li").should("have.length", 1);
  });
});
