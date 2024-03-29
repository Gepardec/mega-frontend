import {booleanCompare, stringCompare} from '@mega/shared/util-common';
import {ProjectManagementEntryViewModel} from '@mega/project-management/data-model';
import {ProjectState} from '@mega/shared/data-model';

/**
 * Die Projekte sollen wie folgt sortiert werden:
 * Projekte, bei denen etwas zutun ist, sollen vor projekte, bei denen nichts zutun ist, sein, sprich "TodoProject" > "Project"
 * Ein Project ist ein "TodoProject", sobald eines der folgenden Kriterien zutrifft:
 *     - Mitarbeiter Überprüfung nicht fertig
 *     - Projectcontrolling Status ist 'Offen' oder 'In Arbeit'
 *     - Projectbilling Status ist 'Offen' oder 'In Arbeit'
 * Danach soll erst nach den Projektnamen alphabetisch aufsteigend sortiert werden (AAA vor BBB)
 *
 *
 * !!! AUFRUFER MUSS SORT().REVERSE aufrufen, weil javascript standardmäßig asc sortiert und hier die logik quasi invertiert ist !!!
 */
export function comparePmEntriesFn(a: ProjectManagementEntryViewModel, b: ProjectManagementEntryViewModel) {
  const isTodoA = isTodoProject(a);
  const isTodoB = isTodoProject(b);


  return booleanCompare(isTodoA, isTodoB)
    || stringCompare(b.projectName, a.projectName); // reversed -> DESC order -> AAA > BBB
}

const todoProjectStates = [ProjectState.OPEN, ProjectState.WORK_IN_PROGRESS];

function isTodoProject(project: ProjectManagementEntryViewModel) {
  return !project.allProjectCheckStatesDone
    || todoProjectStates.includes(project.controlProjectState)
    || todoProjectStates.includes(project.controlBillingState);
}
