import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";

const App = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
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

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

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

export default App;
