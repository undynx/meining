import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SignIn } from './index';

export default {
  component: SignIn,
  title: 'Common/SignIn',
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = () => <SignIn />;

export const Default = Template.bind({});
