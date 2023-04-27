import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactDetails: [],
  searchDetails: [],
};

export const SaveContactsSlice = createSlice({
  name: "saveContacts",
  initialState,
  reducers: {
    saveDetails: (state, action) => {
      state.contactDetails.push(action.payload);
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const objIdIndex = state.contactDetails.findIndex((obj) => obj.id === id);
      state.contactDetails.splice(objIdIndex, 1);
      if (state.searchDetails.length !== 0) {
      const objIdIndexOfSearch = state.searchDetails.findIndex(
        (obj) => obj.id === id
      );
      state.searchDetails.splice(objIdIndexOfSearch, 1);
      }
    },
    searchItem: (state, action) => {
      const keyword = action.payload;
      const filterList = state.contactDetails.filter((contact) =>
        contact.name.includes(keyword)
      );
      state.searchDetails = filterList;
    },
    resetItems: (state) => {
      state.searchDetails = [];
    },
    updateItemById: (state, action) => {
      const updatedDetails = action.payload;
      const index = state.contactDetails.findIndex(
        (obj) => obj.id === updatedDetails.id
      );
      state.contactDetails[index] = updatedDetails;
      if (state.searchDetails.length !== 0) {
        const indexOfSearch = state.searchDetails.findIndex(
          (obj) => obj.id === updatedDetails.id
        );
        state.searchDetails[indexOfSearch] = updatedDetails;
      }
    },
  },
});

export const {
  saveDetails,
  deleteItem,
  searchItem,
  resetItems,
  updateItemById,
} = SaveContactsSlice.actions;

export default SaveContactsSlice.reducer;
