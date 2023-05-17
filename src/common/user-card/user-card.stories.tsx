import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserCard } from './index';

export default {
  component: UserCard,
  title: 'Common/UserCard',
} as ComponentMeta<typeof UserCard>;

const Template: ComponentStory<typeof UserCard> = (args) => <UserCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Name',
  lastname: 'LastName',
  gender: 'Female',
};
