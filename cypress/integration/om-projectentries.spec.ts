// @ts-ignore
import employee from '../fixtures/officemanagement/officemanagemententries.json';

describe('Office Management (Projekte)', () => {

  const suiteFixtures = [
    '@getInfo',
    '@getUser',
    '@getEnterpriseEntries',
    '@getProjectManagementEntries',
    '@getOfficeManagementEntries',
    '@getProjectsWithoutLeadsEntries',
    '@getProjectComments'
  ];

  beforeEach(() => {
    cy.fixture('common/info.json').then(jsonData => {
      cy.intercept('http://localhost:*/info', jsonData).as('getInfo');
    });

    cy.fixture('officemanagement/enterpriseentries.json').then(jsonData => {
      cy.intercept('http://localhost:*/enterprise/entriesformonthyear/*/*', jsonData).as('getEnterpriseEntries');
    });

    cy.fixture('officemanagement/projectmanagemententries.json').then(jsonData => {
      cy.intercept('http://localhost:*/management/projectmanagemententries/*/*?all=true', jsonData).as('getProjectManagementEntries');
    });

    cy.fixture('officemanagement/officemanagemententries.json').then(jsonData => {
      cy.intercept('http://localhost:*/management/officemanagemententries/*/*', jsonData).as('getOfficeManagementEntries');
    });

    cy.fixture('officemanagement/projectswithoutleads.json').then(jsonData => {
      cy.intercept('http://localhost:*/management/projectsWithoutLeads', jsonData).as('getProjectsWithoutLeadsEntries');
    });

    cy.fixture('officemanagement/projectcomments.json').then(jsonData => {
      cy.intercept('http://localhost:*/projectcomments?date=**-**-**&projectName=Cash-Cow-Project', jsonData).as('getProjectComments');
    });

    cy.fixture('common/user.json').then(jsonData => {
      cy.intercept('http://localhost:*/user', jsonData).as('getUser');
    });

    cy.fixture('common/config.json').then(jsonData => {
      cy.intercept('http://localhost:*/config', jsonData).as('getConfig');
    });

    // @ts-ignore
    cy.loginByGoogleApi();
  });

  it('should contain one element in project table in card with title "Projekte"', () => {
    visitAndWaitForRequests('/officeManagement');
    cy.get('[data-cy="project-card"] mat-card-title').should('have.text', 'Projekte');
    cy.get('[data-cy="project-table"]').should('have.length', 1);
  });

  it('should display all project checks "open"', () => {
    visitAndWaitForRequests('/officeManagement');
    assertCheck('employees-checked', 'cancel');
    assertCheck('control-project', 'cancel');
    assertCheck('project-billing', 'cancel');
  });

  it('should display all employees checked "done"', () => {
    cy.fixture('officemanagement/projectmanagemententries.json').then(jsonData => {
      jsonData[0].entries[0].projectCheckState = 'DONE';
      cy.intercept('http://localhost:*/management/projectmanagemententries/*/*?all=true', jsonData).as('getProjectManagementEntries');
    });
    visitAndWaitForRequests('/officeManagement');
    assertCheck('employees-checked', 'check_circle');
  });

  it('should display control project "done"', () => {
    cy.fixture('officemanagement/projectmanagemententries.json').then(jsonData => {
      jsonData[0].controlProjectState = 'DONE';
      cy.intercept('http://localhost:*/management/projectmanagemententries/*/*?all=true', jsonData).as('getProjectManagementEntries');
    });
    visitAndWaitForRequests('/officeManagement');
    assertCheck('control-project', 'check_circle');
  });

  it('should display project billing "done"', () => {
    cy.fixture('officemanagement/projectmanagemententries.json').then(jsonData => {
      jsonData[0].controlBillingState = 'DONE';
      cy.intercept('http://localhost:*/management/projectmanagemententries/*/*?all=true', jsonData).as('getProjectManagementEntries');
    });
    visitAndWaitForRequests('/officeManagement');
    assertCheck('project-billing', 'check_circle');
  });

  it('should display all project checks "done"', () => {
    cy.fixture('officemanagement/projectmanagemententries.json').then(jsonData => {
      jsonData[0].entries[0].projectCheckState = 'DONE';
      jsonData[0].controlProjectState = 'DONE';
      jsonData[0].controlBillingState = 'DONE';
      cy.intercept('http://localhost:*/management/projectmanagemententries/*/*?all=true', jsonData).as('getProjectManagementEntries');
    });

    visitAndWaitForRequests('/officeManagement');
    assertCheck('employees-checked', 'check_circle');
    assertCheck('control-project', 'check_circle');
    assertCheck('project-billing', 'check_circle');
  });

  function assertCheck(attribute: 'employees-checked' | 'control-project' | 'project-billing', icon: 'cancel' | 'check_circle') {
    cy.get('[data-cy="' + attribute + '"] mat-icon')
      .should('be.visible')
      .should('have.text', icon);
  }

  function visitAndWaitForRequests(endpoint: string, fixtures?: string[]) {
    cy.visit(endpoint);
    cy.wait(fixtures ? fixtures : suiteFixtures);
  }
});
