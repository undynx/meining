import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SignUp } from './index';

export default {
  component: SignUp,
  title: 'Common/SignUp',
} as ComponentMeta<typeof SignUp>;

const Template: ComponentStory<typeof SignUp> = () => <SignUp />;

export const Default = Template.bind({});
