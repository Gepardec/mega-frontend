// @ts-ignore
import employee from '../fixtures/officemanagement/officemanagemententries.json';
import {State} from '@mega/shared/data-model';

describe('Office Management (Mitarbeiter)', () => {

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

  it('should contain one element in employee table in card with title "Mitarbeiter"', () => {
    visitAndWaitForRequests('/officeManagement');
    cy.get('[data-cy="employee-card"] mat-card-title').should('have.text', 'Mitarbeiter');
    cy.get('[data-cy="employee-table"]').should('have.length', 1);
  });

  it('should display all employee checks "open"', () => {
    visitAndWaitForRequests('/officeManagement');
    assertSelect('internal-check', 'Offen');
    assertCheck('employee-check', 'cancel');
    assertCheck('project-check', 'cancel');
  });

  it('should change the status of "Interne Zeiten" when "Fertig" gets selected', () => {
    visitAndWaitForRequests('/officeManagement');
    assertSelect('internal-check', 'Offen');

    cy.intercept('PUT', 'http://localhost:*/stepentry/updateEmployeeStateForOffice', {
      body: true
    }).as('updateEmployeeStateForOffice');

    cy.get('app-state-select').click().get('[data-cy="option-done"]').click();

    cy.wait('@updateEmployeeStateForOffice').then((interception) => {
      cy.wrap(interception.request.body).as('requestData');
    });

    cy.get('@requestData').should('deep.include', {
      stepId: 2,
      employee: {
        ...employee[0].employee
      },
      newState: State.DONE
    });

    cy.fixture('officemanagement/officemanagemententries.json').then(jsonData => {
      jsonData[0].internalCheckState = 'DONE';
      cy.intercept('http://localhost:*/management/officemanagemententries/*/*', jsonData).as('getOfficeManagementEntries');
    });

    visitAndWaitForRequests('/officeManagement');

    assertSelect('internal-check', 'Fertig');
  });

  it('should display that the employee confirmed his bookings', () => {
    cy.fixture('officemanagement/officemanagemententries.json').then(jsonData => {
      jsonData[0].employeeCheckState = 'DONE';
      cy.intercept('http://localhost:*/management/officemanagemententries/*/*', jsonData).as('getOfficeManagementEntries');
    });

    visitAndWaitForRequests('/officeManagement');
    assertCheck('employee-check', 'check_circle');
  });

  it('should display that the project lead confirmed the employees bookings', () => {
    cy.fixture('officemanagement/officemanagemententries.json').then(jsonData => {
      jsonData[0].projectCheckState = 'DONE';
      cy.intercept('http://localhost:*/management/officemanagemententries/*/*', jsonData).as('getOfficeManagementEntries');
    });

    visitAndWaitForRequests('/officeManagement');
    assertCheck('project-check', 'check_circle');
  });

  it('should display all employee checks done when checks in response are set to "done"', () => {
    cy.fixture('officemanagement/officemanagemententries.json').then(jsonData => {
      jsonData[0].internalCheckState = 'DONE';
      jsonData[0].employeeCheckState = 'DONE';
      jsonData[0].projectCheckState = 'DONE';
      cy.intercept('http://localhost:*/management/officemanagemententries/*/*', jsonData).as('getOfficeManagementEntries');
    });

    visitAndWaitForRequests('/officeManagement');
    assertSelect('internal-check', 'Fertig');
    assertCheck('employee-check', 'check_circle');
    assertCheck('project-check', 'check_circle');
  });

  it('should indicate that there is one comment present for the employee', () => {
    cy.fixture('officemanagement/officemanagemententries.json').then(jsonData => {
      jsonData[0].totalComments = 1;
      cy.intercept('http://localhost:*/management/officemanagemententries/*/*', jsonData).as('getOfficeManagementEntries');
    });

    visitAndWaitForRequests('/officeManagement');

    cy.get('[data-cy="comment-indicator"]')
      .should('contain.text', '0 / 1')
      .children('span')
      .should('have.class', 'red');
  });

  it('should indicate that there is one resolved comment out of one for the employee', () => {
    cy.fixture('officemanagement/officemanagemententries.json').then(jsonData => {
      jsonData[0].totalComments = 1;
      jsonData[0].finishedComments = 1;
      cy.intercept('http://localhost:*/management/officemanagemententries/*/*', jsonData).as('getOfficeManagementEntries');
    });

    visitAndWaitForRequests('/officeManagement');

    cy.get('[data-cy="comment-indicator"]')
      .should('contain.text', '1 / 1')
      .children('span')
      .should('have.class', 'green');
  });

  it('should display user comments and can add new ones', () => {
    cy.fixture('officemanagement/officemanagemententries.json').then(jsonData => {
      cy.intercept('http://localhost:*/management/officemanagemententries/*/*', jsonData);
    }).as('getOfficeManagementEntries');

    cy.fixture('common/create-employee-comment.json').then(jsonData => {
      cy.intercept('POST', 'http://localhost:*/comments', jsonData).as('create-employee-comment');
    });

    cy.intercept('http://localhost:*/comments/getallcommentsforemployee?email=**&date=**', []
    ).as('employee-comments-empty');

    visitAndWaitForRequests('/officeManagement');

    cy.get('app-done-comments-indicator').should('contain.text', '− / −');

    cy.get('[data-cy="open-comments"]').click();
    cy.wait('@employee-comments-empty');

    // getallcommentsforemployee will return comments for further requests
    cy.fixture('common/employee-comments.json').then(jsonData => {
      cy.intercept('http://localhost:*/comments/getallcommentsforemployee?email=**&date=**', jsonData);
    }).as('employee-comments');

    // officemanagemententries will contain comments for further requests
    cy.fixture('officemanagement/officemanagemententries.json').then(jsonData => {
      jsonData[0].totalComments = 1;
      cy.intercept('http://localhost:*/management/officemanagemententries/*/*', jsonData);
    }).as('getOfficemanagemententriesWithComments');

    cy.get('app-comments-for-employee textarea').type('Hallo Chuck Norris!');
    cy.get('app-comments-for-employee [data-cy="add-comment"]').click();
    cy.wait('@employee-comments');
    cy.wait('@getOfficemanagemententriesWithComments');

    cy.get('[data-cy="employee-comments"] td:nth-child(4)').should('contain.text', 'Hallo Chuck Norris!');

    cy.get('[data-cy="close"]').click();

    cy.get('app-done-comments-indicator').should('contain.text', '0 / 1');
  });

  function assertCheck(attribute: 'employee-check' | 'internal-check' | 'customer-check' | 'project-check', icon: 'cancel' | 'check_circle') {
    cy.get('[data-cy="' + attribute + '"] mat-icon')
      .should('be.visible')
      .should('have.text', icon);
  }

  function assertSelect(attribute: string, text: string) {
    cy.get('[data-cy="' + attribute + '"]')
      .should('be.visible')
      .should('have.text', text);
  }

  function visitAndWaitForRequests(endpoint: string, fixtures?: string[]) {
    cy.visit(endpoint);
    cy.wait(fixtures ? fixtures : suiteFixtures);
  }
});
