import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ideaOwner: "",
  contactEmail: "",
  ideaTitle: "",
  ideaDescription: "",
  ideaCategory: "",
  proofOfConcept: "",
  supportingDocuments: [], // Array of { id, url, type, name }
  expectedOutcome: "",
  currentStage: "",
  contributors: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addSupportingDocument: (state, action) => {
      const { url, type, name } = action.payload;
      state.supportingDocuments.push({
        id: Date.now().toString(), // unique id for each document
        url,
        type,
        name,
      });
    },
    removeSupportingDocument: (state, action) => {
      const documentId = action.payload;
      state.supportingDocuments = state.supportingDocuments.filter(
        (doc) => doc.id !== documentId
      );
    },
    updateSupportingDocument: (state, action) => {
      const { id, updates } = action.payload;
      const docIndex = state.supportingDocuments.findIndex(
        (doc) => doc.id === id
      );
      if (docIndex !== -1) {
        state.supportingDocuments[docIndex] = {
          ...state.supportingDocuments[docIndex],
          ...updates,
        };
      }
    },
    resetForm: () => initialState,
  },
});

export const {
  updateField,
  addSupportingDocument,
  removeSupportingDocument,
  updateSupportingDocument,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
