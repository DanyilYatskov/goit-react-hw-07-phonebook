import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './contactsActions';

const defaultContactsValue = [];
const defaultFilterValue = '';

const contacts = createReducer(defaultContactsValue, {
  [actions.fetchContactsSuccess]: (_, { payload }) => payload,
  [actions.addContactSuccess]: (state, { payload }) => [...state, payload],
  [actions.deleteContactSuccess]: (state, actions) =>
    state.filter(({ id }) => id !== actions.payload),
});

const contactsFilter = createReducer(defaultFilterValue, {
  [actions.changeFilter]: (_, { payload }) => payload,
});

const error = createReducer(null, {});

const loading = createReducer(false, {
  [actions.fetchContactsRequest]: () => true,
  [actions.fetchContactsSuccess]: () => false,
  [actions.fetchContactsError]: () => false,
  [actions.addContactRequest]: () => true,
  [actions.addContactSuccess]: () => false,
  [actions.addContactError]: () => false,
  [actions.deleteContactRequest]: () => true,
  [actions.deleteContactSuccess]: () => false,
  [actions.deleteContactError]: () => false,
});

export default combineReducers({
  contacts,
  contactsFilter,
  error,
  loading,
});
