import React, { ReactNode, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Todo } from '../../store/actions/storyTodoAction';
import { getTodo, getTodos } from '../../store/actions/todoAction';
import { useAppDispatch, useAppSelector } from '../../store/reducers/hooks';
import TodoTable from './TodoTable';

export interface Props {
  // children: ReactNode;
}

export const TodoList: React.FC = (props: Props) => {
  const dispatch = useAppDispatch();
  const { todositem, isLoading, errorMessage } = useAppSelector(
    (state) => state.storytodos
  );
  console.log('storytodos->', todositem);

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const DataTable = () => (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>#Sl.no</th>
          <th>UserId</th>
          <th>Id</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todositem &&
          todositem
            .slice(0)
            .reverse()
            .map((todoData: Todo, index) => (
              <>
                <TodoTable
                  todoData={todoData}
                  index={index}
                  key={todoData.id}
                  userId={todoData.userId}
                  id={todoData.id}
                  title={todoData.title}
                  completed={todoData.completed}
                />
              </>
            ))}
      </tbody>
    </table>
  );

  return (
    <div>
      {isLoading ? (
        <p>Please wait data is coming...</p>
      ) : errorMessage ? (
        <p>No Data Found!!</p>
      ) : (
        <DataTable />
      )}
    </div>
  );
};
