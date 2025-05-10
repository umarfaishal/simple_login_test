describe('Login Automation Testing', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Login valid (username & password benar)', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('Login gagal - username salah', () => {
    cy.get('input[name="username"]').type('Customer');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('Login gagal - password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('customer123');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('Login gagal - field username kosong', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

  it('Login gagal - field password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

  it('Login gagal - field username & password kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.get('span:contains("Required")').should('have.length.at.least', 2);
  });
});
