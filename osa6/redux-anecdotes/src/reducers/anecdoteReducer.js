import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    //voteAnecdote takes id for action.payload and finds referring object, then returns new list with 1+ votes for found object
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      const voted = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      const newAnecdotes = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : voted
      );
      return newAnecdotes.sort((a, b) => b.votes - a.votes);
    },
    //createAnecdote just pushes object to state, backend stuff is handled in component
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    //easiest way to add one object to store, not used right now
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    //easiest way to change whole store, used to define "initial state" from db.json
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, createAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
