import React, { useState } from 'react';
import {
  deleteTodos,
  getTodos,
  Todo,
} from '../../store/actions/storyTodoAction';
import { useAppDispatch } from '../../store/reducers/hooks';
import Modal from 'react-modal';

interface Props {
  todoData: Todo;
  index: number;
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TodoTable: React.FC<Props> = ({
  todoData,
  userId,
  id,
  title,
  completed,
  index,
}: Props) => {
  const dispatch = useAppDispatch();
  const [openViewModal, setViewOpenModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [todo, setTodo] = useState<Todo>();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const viewTodo = async (todoData: Todo) => {
    // setModal(false);
    setViewOpenModal(true);
    setTodo(todoData);
  };

  const viewCancelClick = () => {
    setViewOpenModal(false);
  };

  const deleteTodoItem = (id: number) => {
    if (window.confirm('Do you want to delete?')) {
      dispatch(deleteTodos({ id }));
      dispatch(getTodos());
    }
  };
  return (
    <>
      <tr key={id}>
        <td>{index + 1}</td>
        <td>{id}</td>
        <td>{userId}</td>
        <td>{title}</td>
        <td>
          {completed == true ? (
            <strong style={{ color: 'green' }}>Yes</strong>
          ) : (
            <strong style={{ color: 'red' }}>No</strong>
          )}
        </td>
        <td>
          <button type="button" onClick={() => viewTodo(todoData)}>
            View
          </button>
          &nbsp;
          <button type="button" onClick={() => deleteTodoItem(id)}>
            Delete
          </button>
        </td>
      </tr>

      {/* View Modal Start */}

      <Modal
        isOpen={openViewModal}
        onRequestClose={viewCancelClick}
        style={customStyles}
        contentLabel="View Todo"
      >
        <button style={{ float: 'right' }} onClick={viewCancelClick}>
          X
        </button>
        <h4>Title: {todo?.title}</h4>

        <strong>
          Completed:{' '}
          {todo?.completed == true ? (
            <span style={{ color: 'green' }}>Yes</span>
          ) : (
            <span style={{ color: 'red' }}>No</span>
          )}
        </strong>
        <button style={{ float: 'right' }} onClick={viewCancelClick}>
          Close
        </button>
      </Modal>
      {/* View Modal End */}
    </>
  );
};

export default TodoTable;
