import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Anecdotes = ({ anecdotes, updateAnecdoteMutation }) => {
  const [state, dispatch] = useContext(NotificationContext);

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdoteMutation.mutate(updatedAnecdote);
    dispatch({ type: "VOTE", payload: anecdote.content });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdotes;
