import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TodoList, Props } from './TodoList';
import { withReduxToolkitStore } from '../decorators/withReduxToolkitStore';

const meta: Meta = {
  title: 'Todolist',
  component: TodoList,
  decorators: [(Story) => withReduxToolkitStore({ Story })],
};
export default meta;

const Template: Story = () => <TodoList />;
export const TodoDataList = Template.bind({});
