import NewAnecdote from "./components/AnecdoteForm";
import Anecdotes from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {
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
