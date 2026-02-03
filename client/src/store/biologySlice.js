import { createSlice } from "@reduxjs/toolkit";

const biologySlice = createSlice({
  name: "biology",
  initialState: {
    user: {
      username: "",
      password: "",
      creatures: [],
      airesponses: [],
      userAnswers: [],
    },
  },
  reducers: {
    createCreature(state, action) {
      return {
        ...state,
        user: {
          ...state.user,
          creatures: [...state.user.creatures, action.payload],
        },
      };
    },
    addUser(state, action) {
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    },
  },
});

export const { createCreature, addUser } = biologySlice.actions;
export default biologySlice.reducer;
