import type {Meta, StoryObj} from '@storybook/angular';
import {applicationConfig, moduleMetadata} from '@storybook/angular';


import {StorybookMinimalSetupModule} from '../modules/storybook-minimalsetup.module';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {EmployeeCheckComponent} from '@mega/monthly-report/feature-monthly-report';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {State} from '@mega/shared/data-model';


const meta: Meta<EmployeeCheckComponent> = {
    component: EmployeeCheckComponent,
    decorators: [
        applicationConfig({
            providers: [provideHttpClient()]
        })
    ],
    argTypes: {
        monthlyReport: {
            control: 'object'
        }
    }
};

export default meta;

type Story = StoryObj<EmployeeCheckComponent>;

const monthlyReportArgs: MonthlyReport = {
    employee: {
        userId: '066-mleitner',
        email: 'michael.leitner@gepardec.com',
        title: null,
        firstname: 'Michael',
        lastname: 'Leitner',
        salutation: null,
        releaseDate: '2022-06-30',
        workDescription: '07',
        // language: 'de',
        // regularWorkingHours: {WEDNESDAY: 8, TUESDAY: 8, THURSDAY: 8, MONDAY: 0, FRIDAY: 6.5},
        active: true,
        // exitDate: null
    },
    initialDate: null,
    timeWarnings: [{date: '2023-09-14', description: ['Du hast keine Zeit-Buchung vorgenommen!']}, {
        date: '2023-09-20',
        description: ['Du hast keine Zeit-Buchung vorgenommen!']
    }, {date: '2023-09-01', description: ['Du hast keine Zeit-Buchung vorgenommen!']}, {
        date: '2023-09-08',
        description: ['Du hast keine Zeit-Buchung vorgenommen!']
    }, {date: '2023-09-29', description: ['Du hast keine Zeit-Buchung vorgenommen!']}, {
        date: '2023-09-13',
        description: ['Du hast keine Zeit-Buchung vorgenommen!']
    }, {date: '2023-09-05', description: ['Du hast keine Zeit-Buchung vorgenommen!']}],
    journeyWarnings: [],
    comments: [],
    employeeCheckState: 'OPEN',
    employeeCheckStateReason: null,
    internalCheckState: State.OPEN,
    // isAssigned: false,
    employeeProgresses: [],
    otherChecksDone: true,
    vacationDays: 0,
    homeofficeDays: 0,
    compensatoryDays: 0,
    // nursingDays: 0,
    // maternityLeaveDays: 0,
    // externalTrainingDays: 0,
    // conferenceDays: 0,
    // maternityProtectionDays: 0,
    // fatherMonthDays: 0,
    // paidSpecialLeaveDays: 0,
    // nonPaidVacationDays: 0,
    vacationDayBalance: 6,
    billableTime: '08:15',
    totalWorkingTime: '08:15',
    paidSickLeave: 0,
    assigned: false
};


export const NotAvailable: Story = {
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
        },
    },
    args: {
        monthlyReport: {
            ...monthlyReportArgs,
        }
    }
};
export const AllDone: Story = {
    args: {
        monthlyReport: {
            ...monthlyReportArgs,
            employeeCheckState: 'DONE',
            internalCheckState: State.DONE
        }
    }
};
export const Error: Story = {
    args: {
        monthlyReport: {
            ...monthlyReportArgs,
            assigned: true
        }
    }
};
export const AllError: Story = {
    args: {
        monthlyReport: {
            ...monthlyReportArgs,
            assigned: true,
            employeeCheckState: 'OPEN'
        }
    }
};

