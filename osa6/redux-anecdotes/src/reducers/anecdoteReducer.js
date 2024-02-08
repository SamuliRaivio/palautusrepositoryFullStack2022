import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    //easiest way to change whole store, used to define "initial state" from db.json
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

//initializeAnecdotes initializes anecdotes based on the data from backend
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

//creates new anecode and handles backend stuff
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

//vote anecdote takes object (anecdote to vote) as parameter and first creates new object as the given anecdote with 1 + votes
//then calls voteObject from servises to handle backend stuff
//finally calls getAll to get the new backend data with updated anecdote and dispatches setAnecdotes to update store state,  as in initializeAnecdotes
export const voteAnecdote = (obj) => {
  return async (dispatch) => {
    const newObj = { ...obj, votes: obj.votes + 1 };
    await anecdoteService.voteObject(newObj);
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export default anecdoteSlice.reducer;
