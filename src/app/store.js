import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import saveContactReducer from '../features/counter/SaveContactsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    saveContacts: saveContactReducer
  },
});
