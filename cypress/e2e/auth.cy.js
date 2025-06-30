describe("Page Auth - Login et Inscription Web (mock complet)", () => {
  const selectors = {
    email: 'input[placeholder="Adresse e-mail"]',
    password: 'input[placeholder="Mot de passe"]',
    confirmPassword: 'input[placeholder="Confirmer le mot de passe"]',
    username: 'input[placeholder="Nom d\'utilisateur"]',
    submitBtn: 'button[type="submit"]',
  };

  function fillLoginForm({ email, password }) {
    cy.get(selectors.email).clear().type(email);
    cy.get(selectors.password).clear().type(password);
  }

  function fillRegisterForm({ username, email, password, confirmPassword }) {
    cy.get(selectors.username).clear().type(username);
    cy.get(selectors.email).clear().type(email);
    cy.get(selectors.password).clear().type(password);
    cy.get(selectors.confirmPassword).clear().type(confirmPassword);
  }

  beforeEach(() => {
    cy.intercept("POST", "/auth/getToken").as("loginRequest");
    cy.intercept("POST", "/auth/register").as("registerRequest");
    cy.visit("/auth");
  });

  it("s'inscrit avec succès et affiche le message de confirmation", () => {
    cy.contains("Créer un compte").click();

    fillRegisterForm({
      username: "nouvelutilisateur",
      email: "nouveau@test.com",
      password: "TestTest1234!",
      confirmPassword: "TestTest1234!",
    });

    cy.get(selectors.submitBtn).click();
    cy.wait("@registerRequest");

    cy.contains(
      "Inscription réussie ! Vérifie ton adresse e-mail pour activer ton compte."
    ).should("be.visible");

    cy.get(selectors.email).should("have.value", "");
    cy.get(selectors.password).should("have.value", "");
    cy.get(selectors.confirmPassword).should("have.value", "");
    cy.get(selectors.username).should("have.value", "");

    cy.contains("Connexion").should("be.visible");
    cy.wait(3000);
  });

  it("se connecte, arrive sur la page d'accueil, pose les cookies simulés et se déconnecte", () => {
    fillLoginForm({
      email: "tyranix61@gmail.com",
      password: "Azertyuiop123!",
    });

    cy.get(selectors.submitBtn).click();
    cy.wait("@loginRequest");

    cy.url().should("include", "/");
    cy.getCookie("access_token").should("exist");
    cy.getCookie("refresh_token").should("exist");
    cy.wait(2000);

    cy.contains("Déconnexion").click();

    cy.getCookie("access_token").should("not.exist");
    cy.getCookie("refresh_token").should("not.exist");
    cy.wait(3000);
  });

  it("affiche et masque le mot de passe", () => {
    fillLoginForm({
      email: "test@test.com",
      password: "MonSuperMotDePasse",
    });

    cy.get(selectors.password).should("have.attr", "type", "password");

    cy.get('[data-cy="toggle-password-visibility"]').first().click();
    cy.get(selectors.password).should("have.attr", "type", "text");

    cy.get('[data-cy="toggle-password-visibility"]').first().click();
    cy.get(selectors.password).should("have.attr", "type", "password");
  });

  it("affiche une erreur si les mots de passe ne correspondent pas", () => {
    cy.contains("Créer un compte").click();

    fillRegisterForm({
      username: "nouvelutilisateur",
      email: "nouveau@test.com",
      password: "Test1234!",
      confirmPassword: "AutreMot2Passe!",
    });

    cy.get(selectors.submitBtn).click();

    cy.contains("Les mots de passe ne correspondent pas.").should("be.visible");
  });

  it("affiche une erreur si l'email est invalide", () => {
    cy.contains("Créer un compte").click();

    fillRegisterForm({
      username: "user",
      email: "email-invalide",
      password: "Test1234!",
      confirmPassword: "Test1234!",
    });

    cy.get(selectors.submitBtn).click();

    cy.get(selectors.email).then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });

  it("affiche une erreur lors de la connexion si l'API renvoie une erreur", () => {
    cy.intercept("POST", "/auth/getToken").as("loginRequestError");

    fillLoginForm({
      email: "invalide@test.com",
      password: "MauvaisMotDePasse",
    });

    cy.get(selectors.submitBtn).click();
    cy.wait("@loginRequestError");

    cy.contains("User not found").should("be.visible");
  });

  it("bascule plusieurs fois entre Connexion et Inscription sans erreurs", () => {
    cy.contains("Créer un compte").click();
    cy.contains("Inscription").should("be.visible");

    cy.contains("Se connecter").click();
    cy.contains("Connexion").should("be.visible");

    cy.contains("Créer un compte").click();
    cy.contains("Inscription").should("be.visible");

    cy.contains("Se connecter").click();
    cy.contains("Connexion").should("be.visible");
  });
});
