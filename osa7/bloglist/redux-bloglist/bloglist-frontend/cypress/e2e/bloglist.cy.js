describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser({
      username: "JHakkuumaa",
      firstname: "Johannes",
      lastname: "Hakkuumaa",
      password: "SalainenSalasana",
    });
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Log in");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("JHakkuumaa");
      cy.get("#password").type("SalainenSalasana");
      cy.get("#login-button").click();

      cy.contains("Johannes Hakkuumaa logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("JHakkuumaa");
      cy.get("#password").type("Wrong");
      cy.get("#login-button").click();

      cy.get(".error").should("contain", "Wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "JHakkuumaa", password: "SalainenSalasana" });
    });

    it("A blog can be created", function () {
      cy.contains("BLOGS");
      cy.contains("new blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#add-button").click();

      cy.contains("title: test title author: test author");
      cy.get(".notificationAdd").should(
        "contain",
        "test title by test author added"
      );
    });

    describe("User interaction with blog element", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test title1",
          author: "test author1",
          url: "test url",
        });
      });

      it("Blog can be liked", function () {
        cy.contains("view").click();
        cy.contains("likes: 0");
        cy.contains("like").click();
        cy.contains("likes: 1");
      });

      it("Blog can be deleted by user who add it", function () {
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.contains("title: test title author: test author").should(
          "not.exist"
        );
      });

      it("Blog can't be deleted by user who didn't add it", function () {
        cy.contains("logout").click();
        cy.contains("Log in");
        cy.createUser({
          username: "EVanhatalo",
          firstname: "Elisabet",
          lastname: "Vanhatalo",
          password: "SalasanaSalainen",
        });
        cy.login({ username: "EVanhatalo", password: "SalasanaSalainen" });

        cy.contains("view").click();
        cy.contains("remove").should("not.exist");
      });

      it("Blogs are sorted with likes (most likes on top)", function () {
        cy.createBlog({
          title: "test title2",
          author: "test author2",
          likes: 2,
          url: "test ur2",
        });
        cy.createBlog({
          title: "test title3",
          author: "test author3",
          likes: 3,
          url: "test ur3",
        });
        cy.createBlog({
          title: "test title4",
          author: "test author4",
          likes: 4,
          url: "test ur4",
        });
        cy.createBlog({
          title: "test title5",
          author: "test author5",
          likes: 5,
          url: "test ur5",
        });

        cy.get(".blogStyle").eq(0).should("contain", "test title5");
        cy.get(".blogStyle").eq(4).should("contain", "test title1");

        cy.get(".blogStyle").eq(4).contains("view").click();
        cy.contains("like")
          .click()
          .click()
          .click()
          .click()
          .click()
          .click()
          .click()
          .click()
          .click()
          .click()
          .click()
          .click();

        cy.get(".blogStyle").eq(0).should("contain", "test title1");
        cy.get(".blogStyle").eq(1).should("contain", "test title5");
        cy.get(".blogStyle").eq(4).should("contain", "test title2");
      });
    });
  });
});
