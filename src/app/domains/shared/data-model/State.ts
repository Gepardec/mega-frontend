export enum State {
  OPEN = 'OPEN',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  // this state only exists client-side to don't display reasons dialog / check button
  EMPLOYEE_IS_DONE = 'EMPLOYEE_IS_DONE',
  PREMATURE_CHECK = 'PREMATURE_CHECK'
}
