import {Meta, StoryObj} from '@storybook/angular';
import {InlineTextEditorComponent} from '@mega/shared/ui-common';


const meta: Meta<InlineTextEditorComponent> = {
  component: InlineTextEditorComponent,
  argTypes: {
    comment: {
      control: 'string'
    }
  }
};

export default meta;

type Story = StoryObj<InlineTextEditorComponent>;




export const Comment: Story = {
  args: {
    comment: 'I am a comment :)'
  }
};
