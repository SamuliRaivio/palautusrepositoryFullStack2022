import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { notificationToShow } from "../reducers/notificationReducer";
import Filter from "./Filter";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterValue = useSelector((state) => state.filter);

  const anecdotesToShow = anecdotes.filter((anecdote) =>
    anecdote.content.includes(filterValue)
  );

  const voteClick = (id, content) => {
    dispatch(notificationToShow(`You voted ${content}`));
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      <div>
        <Filter />
      </div>
      <div>
        {anecdotesToShow.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => voteClick(anecdote.id, anecdote.content)}
          />
        ))}
      </div>
    </div>
  );
};

export default Anecdotes;
