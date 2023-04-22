import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 contactDetails :[]
};

export const SaveContactsSlice = createSlice({
  name: 'saveContacts',
  initialState,  
  reducers: {
    saveDetails: (state,action) => {      
      state.contactDetails.push(action.payload);
    }    
  },
 
});

export const { saveDetails } = SaveContactsSlice.actions;


export default SaveContactsSlice.reducer;
