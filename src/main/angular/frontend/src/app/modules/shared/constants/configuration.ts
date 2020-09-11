export const configuration = {
  PAGE_URLS: {
    MONTHLY_REPORT: 'monthlyReport',
    OFFICE_MANAGEMENT: 'officeManagement',
    LOGIN: 'login',
    ERROR: 'error'
  },

  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/1wUJHMtkY47RhLIGytg_MXVe_hgPAj_yzozLMcv5hrdU/',
  ZEP_URL: 'https://www.zep-online.de/zepgepardecservices',
  OFFICE_MANAGEMENT_SEGMENT: `view/index.php?menu=MitarbeiterVerwaltungMgr&
  modelContentMenu=true&mgr=MitarbeiterProjektzeitMgr&contentModelId=`,

  EMPLOYEE_FUNCTIONS: {
    '01': 'Technische/r PL',
    '02': 'SoftwareentwicklerIn',
    '03': 'Verwaltung',
    '04': 'Senior',
    '05': 'Junior',
    '06': 'ExpertIn Inbetriebnahme',
    '06-1': 'Software-ArchitektIn',
    '07': 'FerialpraktikantIn',
    '08': 'Consultant Senior',
    '99': 'Reisezeiten'
  },

  dateFormat: 'yyyy-MM-dd',

  LogLevel: {
    All: 0,
    Debug: 1,
    Info: 2,
    Warn: 3,
    Error: 4,
    Fatal: 5,
    Off: 6
  },

  logWithDate: true
};
