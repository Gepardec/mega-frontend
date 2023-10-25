import { JourneyCheckComponent } from '@mega/monthly-report/feature-monthly-report';
import type {Meta, StoryObj} from '@storybook/angular';
import {moduleMetadata} from '@storybook/angular';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {State} from '@mega/shared/data-model';

const meta: Meta<JourneyCheckComponent> = {
    component: JourneyCheckComponent,
    argTypes: {
        monthlyReport: {
            control: 'object'
        }
    },
};

export default meta;

type Story = StoryObj<JourneyCheckComponent>;

const monthlyReportArgs: MonthlyReport = {
    internalCheckState: State.DONE, paidSickLeave: 0,
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
    timeWarnings: [{date: '2023-09-08', description: ['Du hast keine Zeit-Buchung vorgenommen!']}, {
        date: '2023-09-27',
        description: ['Du hast keine Zeit-Buchung vorgenommen!']
    }],
    journeyWarnings: [],
    comments: [],
    employeeCheckState: 'OPEN',
    employeeCheckStateReason: null,
    // internalCheckState: 'OPEN',
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
    // paidSickLeave: '0',
    assigned: false
};


export const journeyCorrect: Story = {
    args: {
        monthlyReport: monthlyReportArgs
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
        },
    },
};

export const journeyError: Story = {
    args: {
        monthlyReport: {
            ...monthlyReportArgs,
            journeyWarnings: [{warnings: ['Error'], date: '2023-09-08'}]
        }
    }
};

