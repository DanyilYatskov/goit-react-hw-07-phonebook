import axios from 'axios';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  changeFilter,
} from './contactsActions';

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());
  try {
    const { data } = await axios.get('/contacts');

    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error));
  }
  // axios
  //   .get('/todos')
  //   .then(({ data }) => dispatch(fetchTodosSuccess(data)))
  //   .catch(error => dispatch(fetchTodosError(error)));
};

const addNewContact = ({ name, number }) => async dispatch => {
  const newContact = {
    name,
    number,
  };

  dispatch(addContactRequest());
  try {
    const { data } = await axios.post('/contacts', newContact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }

  //   axios
  //     .post('/todos', todo)
  //     .then(({ data }) => dispatch(addTodoSuccess(data)))
  //     .catch(error => dispatch(addTodoError(error)));
};

const deleteContact = todoId => async dispatch => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/todos/${todoId}`)
    .then(() => dispatch(deleteTodoSuccess(todoId)))
    .catch(error => dispatch(deleteTodoError(error)));
};

const toggleCompleted = ({ id, completed }) => dispatch => {
  const update = { completed };

  dispatch(toggleCompletedRequest());

  axios
    .patch(`/todos/${id}`, update)
    .then(({ data }) => dispatch(toggleCompletedSuccess(data)))
    .catch(error => dispatch(toggleCompletedError(error)));
};

const exportObj = {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleCompleted,
};
export default exportObj;
