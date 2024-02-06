import { createSlice } from "@reduxjs/toolkit";

//defining the default anecdotes
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

//creating id for anecdote objects, random id here is fine enough
const getId = () => (100000 * Math.random()).toFixed(0);

//creating objects out of anecdotes
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

//making list out of defalut anecdotes as objects, this will be used as initialState for the reducer as the name implies
const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
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
    //createAnecdote takes anecdote string as action.payload and makes new object from it, then returns modified list with new object
    createAnecdote(state, action) {
      const newAnecdote = asObject(action.payload);
      return state.concat(newAnecdote);
    },
  },
});

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
