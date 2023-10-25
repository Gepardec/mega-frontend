import type {Meta, StoryObj} from '@storybook/angular';
import {applicationConfig} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {UserActionsComponent} from '@mega/shared/ui-common';
import {Role, User} from '@mega/shared/data-model';


const meta: Meta<UserActionsComponent> = {
  component: UserActionsComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), provideAnimations()]
    })
  ],
  argTypes: {
    user: {
      control: 'object'
    }
  }
};

export default meta;

type Story = StoryObj<UserActionsComponent>;

const user: User = {
  email: 'max@mustermann', firstname: 'max', lastname: 'mustermann', roles: [Role.EMPLOYEE], userId: '10'

};


export const UserActions: Story = {
  args: {
    user: {
      ...user,
    }
  }
};
