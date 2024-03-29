import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";
import NotificationContext, {
  NotificationCotextProvider,
} from "./NotificationContext";
import { useContext } from "react";
import Anecdotes from "./components/Anecdotes";

const App = () => {
  const [state, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  //mutation for posting data to server
  //mutation calls createNew funkiton to post data to server
  //after success mutation invalidates old query anecdotes to get updated data from server
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onError: () => {
      dispatch({ type: "LENGTHERR" });
      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 5000);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  //basically same as newAnecdoteMutation but with voting the anecdote
  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  //getting all anecdotes from server with React Query
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAll,
    retry: 1,
  });

  //logging usefull data to console about result status
  console.log(JSON.parse(JSON.stringify(result)));

  //if result status is loading just "loading data..." is displayed on screen
  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  //if result status is error just "anecdote service not available due to problems in server" is displayed on screen
  //for example if json server is down
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  //handles voting the anecdote
  //calls updateAnecdoteMutation's mutate funktion to vote anecdote
  /* const handleVote = (anecdote) => {
    //dispatch("NEW");
    console.log(anecdote);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdoteMutation.mutate(updatedAnecdote);
  }; */

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />

      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      <Anecdotes
        updateAnecdoteMutation={updateAnecdoteMutation}
        anecdotes={anecdotes}
      />
      {/* {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))} */}
    </div>
  );
};

export default App;
