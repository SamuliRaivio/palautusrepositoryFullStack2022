import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewAnecdote from "./components/AnecdoteForm";
import Anecdotes from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteService from "./services/anecdotes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;
