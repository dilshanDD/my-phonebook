import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 contactDetails :[],
 searchDetails :[]
};

export const SaveContactsSlice = createSlice({
  name: 'saveContacts',
  initialState,  
  reducers: {
    saveDetails: (state,action) => {      
      state.contactDetails.push(action.payload);
    },
    deleteItem:(state,action) =>{
     const id = action.payload;
     const objIdIndex = state.contactDetails.findIndex((obj)=>obj.id === id);     
     state.contactDetails.splice(objIdIndex,1);  
    },
    searchItem:(state, action) =>{
        const keyword = action.payload; 
        const filterList = state.contactDetails.filter(contact => contact.name.includes(keyword));
        state.searchDetails = filterList;
    },
    resetItems:(state) =>{        
        state.searchDetails = [];
    }     
  },
 
});

export const { saveDetails, deleteItem, searchItem, resetItems } = SaveContactsSlice.actions;


export default SaveContactsSlice.reducer;
