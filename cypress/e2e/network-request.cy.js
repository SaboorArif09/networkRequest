/// <reference types="cypress" />

describe("Network Requests", () => {
    let message = "Unable to find comment!"

    beforeEach(() => {
        cy.visit("https://example.cypress.io/commands/network-requests")
    })

    it("Get Request", () => {
        cy.intercept({
            method: "GET",
            url: "**/comments/*"}).as("getComment");

        cy.get(".network-btn").click();

        cy.wait("@getComment").its("response.statusCode").should("eq", 200)
    })

    it.only("Post Request", () => {
        cy.intercept("POST", "**/comments/*").as('postComment');

        cy.get(".network-post").click();

        cy.wait('@postComment')
        // .then(({request, response}) => {
        //     console.log(request)

        //     // expect(xhr.requestBody).to.include("email");
        //     // expect(xhr.responseBody).to.have.property("name", "Using POST in cy.route()");
        //     // expect(xhr.requestHeaders).to.have.property("Content-Type");
        // })
    })

    it("Put Request", () => {
        cy.intercept({
            method: "PUT",
            url: "**/comments/*",
        },
        {
            statusCode: 404,
            body: { error: message},
            delay: 500
        }).as("putComment");

        cy.get(".network-put").click();

        cy.wait("@putComment")

        cy.get(".network-put-comment").should("contain", message)
    })
})