//Anecdoteform handles users input for new anecdote

import { useContext } from "react";
import NotificationContext from "../NotificationContext";

//onSubmit component calls newAnecdoteMutations mutate funktion to add new anecdote
const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const [state, dispatch] = useContext(NotificationContext);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log(content);

    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate(content);
    dispatch({ type: "NEW", payload: content });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
