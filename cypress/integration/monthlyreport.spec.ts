describe('Mein Mega', () => {

  beforeEach(() => {
    cy.fixture('common/info.json').then(jsonData => {
      cy.intercept('http://localhost:*/info', jsonData).as('getInfo');
    });

    cy.fixture('common/monthendreports.json').then(jsonData => {
      cy.intercept('http://localhost:*/worker/monthendreports', jsonData).as('getMonthendreports');
    });

    cy.fixture('common/user.json').then(jsonData => {
      cy.intercept('http://localhost:*/user', jsonData).as('getUser');
    });

    cy.fixture('common/config.json').then(jsonData => {
      cy.intercept('http://localhost:*/config', jsonData).as('getConfig');
    });

    // @ts-ignore
    cy.loginByGoogleApi();
    cy.visit('/');
    cy.wait(['@getInfo', '@getMonthendreports', '@getUser']);
  });


  it('should confirm the bookings for the selected month', () => {
    cy.intercept('PUT', 'http://localhost:*/stepentry/close', {
      body: true
    }).as('updateEmployeeCheck');

    cy.fixture('common/monthendreports.json').then(jsonData => {
      jsonData.employeeCheckState = 'DONE';
      cy.intercept('http://localhost:*/worker/monthendreports/*/*', jsonData).as('getMonthendreportsDone');
    });

    cy.get('app-employee-check .mat-card')
      .should('not.be.null');
    cy.get('app-employee-check .mat-mdc-card .mat-mdc-card-title')
      .should('have.text', 'Status zum Monatsabschluss');


    cy.get('[data-cy="buchungen_bestaetigen_btn"]')
      .should('have.text', 'Buchungen bestätigen')
      .click();

    cy.wait('@getMonthendreportsDone');

    cy.get('app-employee-check .mat-card mat-card-content button')
      .should('not.exist');
  });
});
